import { motion } from "motion/react";
import { TrainingData } from "../types";
import { X, ChartLine, Search, MessageSquare, Star, ThumbsUp, Download } from "lucide-react";

interface Props {
  data: TrainingData;
  onClose: () => void;
}

export default function AnalyticsDashboard({ data, onClose }: Props) {
  const totalSearches = data.searches.length;
  const totalFeedback = data.feedback.length;
  const avgRating = totalFeedback
    ? (data.feedback.reduce((a, b) => a + b.rating, 0) / totalFeedback).toFixed(2)
    : "0";
  const positiveRate = totalFeedback
    ? ((data.feedback.filter((f) => f.rating >= 4).length / totalFeedback) * 100).toFixed(1)
    : "0";

  const majorCounts: Record<string, number> = {};
  data.searches.forEach((s) => {
    const m = s.preferences.major.toLowerCase();
    majorCounts[m] = (majorCounts[m] || 0) + 1;
  });
  const topMajors = Object.entries(majorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unimind_training_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={28} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <ChartLine className="text-orange-500" size={32} />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            UniMind AI Analytics Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Searches", value: totalSearches, icon: Search },
            { label: "Feedback", value: totalFeedback, icon: MessageSquare },
            { label: "Avg. Rating", value: `${avgRating}/5`, icon: Star },
            { label: "Positive Rate", value: `${positiveRate}%`, icon: ThumbsUp },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center">
              <stat.icon className="mx-auto mb-2 text-orange-500" size={20} />
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              🔥 Top 5 Most Searched Majors
            </h3>
            <div className="space-y-2">
              {topMajors.length > 0 ? (
                topMajors.map(([m, c], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-xl"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                      {m}
                    </span>
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      {c} searches
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No search data yet.</p>
              )}
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
              🤖 AI Training Data
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              This data helps us improve recommendations for all students. Your privacy is respected — no personal IDs stored.
            </p>
            <button
              onClick={exportData}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Export Training Data (JSON)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
