import React from "react";
import { Brain, Users, TrendingUp } from "lucide-react";
import { Preferences, TrainingData } from "../types";

interface Props {
  preferences: Preferences;
  trainingData: TrainingData;
}

export default function StudentInterestAnalysis({ preferences, trainingData }: Props) {
  // Simple AI analysis simulation based on training data
  const totalSearches = trainingData.searches.length;
  const majorInterests = trainingData.searches.reduce((acc, s) => {
    acc[s.preferences.major] = (acc[s.preferences.major] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topInterests = Object.entries(majorInterests)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Brain className="text-purple-500" />
        AI Student Interest Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
            <Users className="text-purple-500" />
            Community Trends
          </h3>
          <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
            Based on {totalSearches} student searches, here are the trending majors in your community:
          </p>
          <div className="space-y-2">
            {topInterests.map(([major, count]) => (
              <div key={major} className="flex justify-between items-center text-sm">
                <span className="text-slate-700 dark:text-slate-300">{major}</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{Math.round((count / totalSearches) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-500" />
            Your Interest Profile
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
            Your current focus is on <strong>{preferences.major}</strong>.
          </p>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p>You are in the top {topInterests.find(i => i[0] === preferences.major) ? 'trending' : 'niche'} interest group.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
