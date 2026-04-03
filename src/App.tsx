import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Moon, Sun, GraduationCap, ChartLine, Brain, Search, BarChart } from "lucide-react";
import { Preferences, ScoredUniversity, TrainingData, Filters } from "./types";
import { getRecommendations, recordSearch, recordFeedback, getTrainingData } from "./lib/ai-engine";
import PreferenceForm from "./components/PreferenceForm";
import FilterForm from "./components/FilterForm";
import UniversityCard from "./components/UniversityCard";
import GoogleCareerGuide from "./components/GoogleCareerGuide";
import StudentInterestAnalysis from "./components/StudentInterestAnalysis";
import JobOpportunities from "./components/JobOpportunities";
import FeedbackModal from "./components/FeedbackModal";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdmissionGuide from "./components/AdmissionGuide";
import Pathshala from "./components/Pathshala";
import ComparisonView from "./components/ComparisonView";

export default function App() {
  const [preferences, setPreferences] = useState<Preferences>({
    major: "Computer Science",
    budget: 35000,
    location: "any",
    priority: "balanced",
  });
  const [filters, setFilters] = useState<Filters>({});

  const [recommendations, setRecommendations] = useState<ScoredUniversity[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("unimind_dark") === "enabled");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [currentSearchId, setCurrentSearchId] = useState<number | null>(null);
  const [trainingData, setTrainingData] = useState<TrainingData>({ searches: [], feedback: [] });
  const [selectedUniversities, setSelectedUniversities] = useState<ScoredUniversity[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const toggleUniversitySelection = (uni: ScoredUniversity) => {
    setSelectedUniversities((prev) =>
      prev.find((u) => u.name === uni.name)
        ? prev.filter((u) => u.name !== uni.name)
        : [...prev, uni]
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("unimind_dark", isDarkMode ? "enabled" : "disabled");
  }, [isDarkMode]);

  useEffect(() => {
    setTrainingData(getTrainingData());
    // Initial analysis
    handleAnalyze();
  }, []);

  const handleAnalyze = () => {
    const recs = getRecommendations(preferences, filters);
    setRecommendations(recs);
    const searchId = recordSearch(preferences, recs);
    setCurrentSearchId(searchId);
    setTrainingData(getTrainingData());
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    if (currentSearchId) {
      recordFeedback(currentSearchId, rating, comment, recommendations);
      setIsFeedbackOpen(false);
      setTrainingData(getTrainingData());
      // Refresh recommendations to show adjusted scores
      setRecommendations(getRecommendations(preferences, filters));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 dark:from-slate-900 dark:to-blue-950 rounded-[2.5rem] p-8 md:p-12 mb-8 text-white shadow-2xl"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">
              <Brain size={14} />
              UniMind AI · 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Best University</span>
              <br />USA & International
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mb-8">
              Smart recommendations based on your major, budget, location preference, and more. 
              No API, pure intelligent heuristics + community feedback.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAnalyze}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <GraduationCap size={20} />
                Find My Universities
              </button>
              <button
                onClick={() => setIsAnalyticsOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <ChartLine size={20} />
                AI Analytics Dashboard
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 text-[12rem] opacity-10 pointer-events-none select-none">
            🎓
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Preferences */}
          <div className="lg:col-span-4">
            <PreferenceForm
              preferences={preferences}
              setPreferences={setPreferences}
              onAnalyze={handleAnalyze}
            />
            <FilterForm
              filters={filters}
              setFilters={setFilters}
              onFilter={handleAnalyze}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Search className="text-orange-500" size={20} />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainingData.searches.slice(-3).reverse().map((s) => (
                  <div key={s.id} className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">{s.preferences.major}</span>
                    <span className="text-slate-400 mx-1">in</span>
                    <span className="capitalize">{s.preferences.location.replace('_',' ')}</span>
                  </div>
                ))}
                {trainingData.searches.length === 0 && <span className="text-sm text-slate-500 italic">No recent searches.</span>}
              </div>
            </div>

            <GoogleCareerGuide />
            <StudentInterestAnalysis preferences={preferences} trainingData={trainingData} />
            <JobOpportunities major={preferences.major} />

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <GraduationCap className="text-orange-500" />
                  Top University Matches
                </h3>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {recommendations.length} Results Found
                </div>
              </div>

              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map((uni, idx) => (
                    <UniversityCard
                      key={uni.name}
                      university={uni}
                      index={idx}
                      onFeedback={() => setIsFeedbackOpen(true)}
                      isSelected={selectedUniversities.some((u) => u.name === uni.name)}
                      onToggleSelect={() => toggleUniversitySelection(uni)}
                    />
                  ))}
                  
                  {selectedUniversities.length > 1 && (
                    <button
                      onClick={() => setIsComparisonOpen(true)}
                      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-xl transition-all flex items-center gap-2 z-40"
                    >
                      <BarChart size={20} />
                      Compare {selectedUniversities.length} Universities
                    </button>
                  )}
                  <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex items-start gap-4 mt-8">
                    <div className="bg-orange-500 p-2 rounded-lg text-white">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">AI Insight</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        These recommendations are based on your preferences + community feedback. 
                        The more students use this tool, the smarter it gets!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-slate-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Matches Found</h4>
                  <p className="text-slate-500 dark:text-slate-400">Try adjusting your preferences to see more results.</p>
                </div>
              )}
              <AdmissionGuide />
              <Pathshala />
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-slate-900 dark:bg-orange-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2 font-bold"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="hidden md:inline">Mode</span>
          </button>
        </div>

        {/* Modals */}
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          onSubmit={handleFeedbackSubmit}
        />

        {isAnalyticsOpen && (
          <AnalyticsDashboard
            data={trainingData}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        )}
        {isComparisonOpen && (
          <ComparisonView
            universities={selectedUniversities}
            onClose={() => setIsComparisonOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
