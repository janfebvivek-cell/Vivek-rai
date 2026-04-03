import React from "react";
import { Filters } from "../types";
import { Filter } from "lucide-react";

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onFilter: () => void;
}

export default function FilterForm({ filters, setFilters, onFilter }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
        <Filter className="text-blue-500" />
        Advanced Filters
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Country</label>
          <input
            type="text"
            value={filters.country || ""}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            placeholder="e.g., USA, Canada"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Min Acceptance Rate (%)</label>
          <input
            type="number"
            value={filters.minAcceptanceRate || ""}
            onChange={(e) => setFilters({ ...filters, minAcceptanceRate: parseInt(e.target.value) || undefined })}
            placeholder="e.g., 20"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Program Keyword</label>
          <input
            type="text"
            value={filters.program || ""}
            onChange={(e) => setFilters({ ...filters, program: e.target.value })}
            placeholder="e.g., AI, Robotics"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
