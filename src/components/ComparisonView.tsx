import React from "react";
import { ScoredUniversity } from "../types";
import { X, DollarSign, TrendingUp, BarChart, BookOpen } from "lucide-react";

export default function ComparisonView({
  universities,
  onClose,
}: {
  universities: ScoredUniversity[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">University Comparison</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div key={uni.name} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{uni.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-orange-500" size={20} />
                  <div>
                    <div className="text-xs text-slate-500">Tuition</div>
                    <div className="font-semibold">${uni.tuition.toLocaleString()}/year</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-orange-500" size={20} />
                  <div>
                    <div className="text-xs text-slate-500">ROI</div>
                    <div className="font-semibold">{uni.roi}/100</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="text-orange-500" size={20} />
                  <div>
                    <div className="text-xs text-slate-500">Acceptance Rate</div>
                    <div className="font-semibold">{uni.details.admissionStats.acceptanceRate}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                    <BookOpen className="text-orange-500" size={16} /> Program Strengths
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uni.details.programStrengths.map((s) => (
                      <span key={s} className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
