import React, { useState } from "react";
import { Brain, Search, Map, Target } from "lucide-react";
import { CareerPath } from "../types";
import { getPathRecommendations } from "../lib/ai-engine";

export default function Pathshala() {
  const [interest, setInterest] = useState("");
  const [paths, setPaths] = useState<CareerPath[]>([]);

  const handleSearch = () => {
    setPaths(getPathRecommendations(interest));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mt-8">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Brain className="text-orange-500" />
        Pathshala: Career Guidance
      </h3>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="What are you interested in? (e.g., AI, Medicine, Engineering)"
          className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          Find Path
        </button>
      </div>

      <div className="space-y-6">
        {paths.map((path) => (
          <div key={path.id} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{path.name}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{path.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Target size={16} className="text-orange-500" /> Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill) => (
                    <span key={skill} className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Map size={16} className="text-orange-500" /> Roadmap
                </h5>
                <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {path.roadmap.map((step) => <li key={step}>{step}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
