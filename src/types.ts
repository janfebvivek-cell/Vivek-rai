export interface MajorStrength {
  [key: string]: number;
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  skills: string[];
  roadmap: string[];
  targetCompanies: string[];
}

export interface University {
  name: string;
  country: string;
  location: string;
  bestCourse: string;
  tuition: number;
  ranking: number;
  roi: number;
  scholarshipRate: number;
  majorStrength: MajorStrength;
  details: {
    programStrengths: string[];
    campusLife: string;
    admissionStats: {
      acceptanceRate: string;
      avgSAT?: string;
      avgGPA: string;
    };
  };
}

export interface Filters {
  country?: string;
  minAcceptanceRate?: number;
  program?: string;
}

export interface Preferences {
  major: string;
  budget: number;
  location: string;
  priority: 'balanced' | 'academic' | 'value' | 'scholarship';
}

export interface ScoredUniversity extends University {
  score: number;
  adjustedScore: number;
}

export interface SearchEntry {
  id: number;
  timestamp: string;
  preferences: Preferences;
  topResults: { name: string; score: number }[];
}

export interface FeedbackEntry {
  searchId: number;
  rating: number;
  comment: string;
  timestamp: string;
  helpful: boolean;
}

export interface TrainingData {
  searches: SearchEntry[];
  feedback: FeedbackEntry[];
}
