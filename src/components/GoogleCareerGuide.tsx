import React from "react";
import { Briefcase, GraduationCap, Target, BookOpen, Award } from "lucide-react";

export default function GoogleCareerGuide() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Briefcase className="text-blue-500" />
        Google Career Roadmap
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">How to get into Google</h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <li>• <strong>Strong Fundamentals:</strong> Data Structures, Algorithms, System Design.</li>
            <li>• <strong>Projects:</strong> Build real-world applications, contribute to open source.</li>
            <li>• <strong>Internships:</strong> Google STEP or Software Engineering internships are key.</li>
            <li>• <strong>Interview Prep:</strong> Practice LeetCode, mock interviews, and behavioral questions.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Role Requirements</h3>
          <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <p><strong>AI/ML Engineer:</strong> Masters/PhD preferred, strong math/stats, PyTorch/TensorFlow.</p>
            <p><strong>Software Engineer (BTech):</strong> Strong CS fundamentals, coding proficiency.</p>
            <p><strong>Design/Art:</strong> Strong portfolio, UX/UI skills, design thinking.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Award className="text-blue-500" />
          Best Universities & Requirements
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
          Google recruits from top-tier universities globally. While they value skills over prestige, 
          a strong academic record (GPA 3.5+) and relevant projects are highly recommended.
        </p>
        <div className="flex flex-wrap gap-2">
          {["MIT", "Stanford", "CMU", "UC Berkeley", "IITs", "ETH Zurich"].map((uni) => (
            <span key={uni} className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
              {uni}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
