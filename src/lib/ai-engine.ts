import { Preferences, University, ScoredUniversity, TrainingData, FeedbackEntry, CareerPath, Filters } from "../types";
import { UNIVERSITIES, CAREER_PATHS } from "../constants";

const TRAINING_DATA_KEY = 'uni_ai_training';
const ADJUSTMENTS_KEY = 'uni_score_adjustments';

export function getTrainingData(): TrainingData {
  const data = localStorage.getItem(TRAINING_DATA_KEY);
  return data ? JSON.parse(data) : { searches: [], feedback: [] };
}

export function getPathRecommendations(interest: string): CareerPath[] {
  const query = interest.toLowerCase().trim();
  if (!query) return [];
  
  return CAREER_PATHS.filter(path => 
    path.name.toLowerCase().includes(query) ||
    path.description.toLowerCase().includes(query) ||
    path.skills.some(skill => skill.toLowerCase().includes(query))
  );
}

export function saveTrainingData(data: TrainingData) {
  localStorage.setItem(TRAINING_DATA_KEY, JSON.stringify(data));
}

export function getAdjustments(): Record<string, number> {
  const data = localStorage.getItem(ADJUSTMENTS_KEY);
  return data ? JSON.parse(data) : {};
}

export function saveAdjustments(adjustments: Record<string, number>) {
  localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(adjustments));
}

export function scoreUniversity(univ: University, preferences: Preferences): number {
  let score = 0;
  const major = preferences.major.toLowerCase();
  const budget = preferences.budget;
  const locationPref = preferences.location;
  const priority = preferences.priority;

  // 1. Major strength match (0-40 points)
  let majorScore = 0;
  for (const [field, strength] of Object.entries(univ.majorStrength)) {
    if (major.includes(field) || field.includes(major)) {
      majorScore = strength;
      break;
    }
  }
  if (majorScore === 0 && major === "computer science") majorScore = univ.majorStrength["computer science"] || 60;
  if (majorScore === 0 && major === "engineering") majorScore = univ.majorStrength["engineering"] || 60;
  if (majorScore === 0 && major === "business") majorScore = univ.majorStrength["business"] || 60;
  score += majorScore * 0.4;

  // 2. Budget fit (0-20 points)
  if (univ.tuition <= budget) score += 20;
  else if (univ.tuition <= budget * 1.3) score += 12;
  else if (univ.tuition <= budget * 1.6) score += 5;

  // 3. Location match (0-15 points)
  if (locationPref === "any") score += 15;
  else if (univ.location === locationPref) score += 15;
  else if (locationPref === "usa_east" && univ.location === "usa_midwest") score += 5;
  else if (locationPref === "usa_west" && univ.location === "usa_east") score += 3;
  else if (locationPref === "europe" && univ.location === "europe") score += 15;
  else if (locationPref === "asia" && univ.location === "asia") score += 15;
  else if (locationPref === "canada" && univ.location === "canada") score += 15;
  else score += 2;

  // 4. Ranking priority adjustment
  if (priority === "academic") score += (100 - univ.ranking) * 0.3;
  else if (priority === "value") score += (univ.roi * 0.5) + ((budget / univ.tuition) * 10);
  else if (priority === "scholarship") score += univ.scholarshipRate * 0.5;
  else score += (100 - univ.ranking) * 0.2; // balanced

  // 5. ROI bonus
  score += univ.roi * 0.3;

  return Math.min(100, Math.max(0, Math.floor(score)));
}

export function getRecommendations(preferences: Preferences, filters?: Filters): ScoredUniversity[] {
  const adjustments = getAdjustments();
  let scored = UNIVERSITIES.map(univ => {
    const baseScore = scoreUniversity(univ, preferences);
    const adj = adjustments[univ.name] || 0;
    const adjustedScore = Math.min(100, Math.max(0, baseScore + adj));
    return {
      ...univ,
      score: baseScore,
      adjustedScore
    };
  });

  if (filters) {
    scored = scored.filter(univ => {
      if (filters.country && univ.country !== filters.country) return false;
      if (filters.minAcceptanceRate !== undefined) {
        const rate = parseInt(univ.details.admissionStats.acceptanceRate.replace('%', ''), 10);
        if (isNaN(rate) || rate < filters.minAcceptanceRate) return false;
      }
      if (filters.program && !univ.details.programStrengths.some(s => s.toLowerCase().includes(filters.program!.toLowerCase()))) return false;
      return true;
    });
  }

  return scored.sort((a, b) => b.adjustedScore - a.adjustedScore).slice(0, 8);
}

export function recordSearch(preferences: Preferences, results: ScoredUniversity[]) {
  const data = getTrainingData();
  const entry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    preferences: { ...preferences },
    topResults: results.slice(0, 3).map(r => ({ name: r.name, score: r.adjustedScore })),
  };
  data.searches.push(entry);
  if (data.searches.length > 500) data.searches.shift();
  saveTrainingData(data);
  return entry.id;
}

export function recordFeedback(searchId: number, rating: number, comment: string, topRecs: ScoredUniversity[]) {
  const data = getTrainingData();
  const feedback: FeedbackEntry = {
    searchId,
    rating,
    comment,
    timestamp: new Date().toISOString(),
    helpful: rating >= 4
  };
  data.feedback.push(feedback);
  if (data.feedback.length > 1000) data.feedback.shift();
  saveTrainingData(data);

  // Adjust scores
  const adjustments = getAdjustments();
  if (rating >= 4) {
    // positive: boost top recommendations
    topRecs.slice(0, 3).forEach(uni => {
      adjustments[uni.name] = (adjustments[uni.name] || 0) + 2;
    });
  } else if (rating <= 2) {
    // negative: penalize top recommendations
    topRecs.slice(0, 2).forEach(uni => {
      adjustments[uni.name] = (adjustments[uni.name] || 0) - 3;
    });
  }

  // Clamp adjustments
  for (const name in adjustments) {
    adjustments[name] = Math.max(-15, Math.min(15, adjustments[name]));
  }
  saveAdjustments(adjustments);
}

export function getSimilarUniversities(target: University, limit: number = 3): University[] {
  const scored = UNIVERSITIES.filter(u => u.name !== target.name).map(univ => {
    let similarity = 0;

    // 1. Location match (30 points)
    if (univ.location === target.location) similarity += 30;

    // 2. Tuition range (30 points)
    const tuitionDiff = Math.abs(univ.tuition - target.tuition);
    const maxTuition = Math.max(univ.tuition, target.tuition);
    similarity += (1 - (tuitionDiff / maxTuition)) * 30;

    // 3. Major strengths overlap (40 points)
    const targetMajors = Object.keys(target.majorStrength);
    const univMajors = Object.keys(univ.majorStrength);
    const commonMajors = targetMajors.filter(m => univMajors.includes(m));
    similarity += (commonMajors.length / Math.max(targetMajors.length, 1)) * 40;

    return { ...univ, similarity };
  });

  return scored
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}
