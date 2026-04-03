import { Preferences } from "../types";
import { Sliders, GraduationCap, DollarSign, MapPin, Trophy } from "lucide-react";

interface Props {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
  onAnalyze: () => void;
}

export default function PreferenceForm({ preferences, setPreferences, onAnalyze }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
        <Sliders className="text-orange-500" />
        Your Preferences
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <GraduationCap size={16} /> Major / Field of Study
            </label>
            <input
              type="text"
              value={preferences.major}
              onChange={(e) => setPreferences({ ...preferences, major: e.target.value })}
              placeholder="e.g., Computer Science, Business, Medicine"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <DollarSign size={16} /> Annual Budget (USD)
            </label>
            <input
              type="number"
              value={preferences.budget}
              onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) || 0 })}
              step="5000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <MapPin size={16} /> Location Preference
            </label>
            <select
              value={preferences.location}
              onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
            >
              <option value="any">Anywhere (USA / International)</option>
              <option value="usa_east">USA - East Coast</option>
              <option value="usa_west">USA - West Coast</option>
              <option value="usa_midwest">USA - Midwest</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="canada">Canada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Trophy size={16} /> Ranking Priority
            </label>
            <select
              value={preferences.priority}
              onChange={(e) => setPreferences({ ...preferences, priority: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
            >
              <option value="balanced">Balanced (Academics + Cost)</option>
              <option value="academic">Academic Reputation (Top Rankings)</option>
              <option value="value">Best Value (Low Cost + Good ROI)</option>
              <option value="scholarship">Scholarship Availability</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={onAnalyze}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
        >
          Find My Universities
        </button>
      </div>
    </div>
  );
}
