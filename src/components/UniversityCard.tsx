import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScoredUniversity } from "../types";
import { MapPin, DollarSign, TrendingUp, GraduationCap, Star, ChevronDown, ChevronUp, BookOpen, Users, BarChart, Layers, Globe, Map } from "lucide-react";
import { getSimilarUniversities } from "../lib/ai-engine";

export default function UniversityCard({
  university,
  index,
  onFeedback,
  isSelected,
  onToggleSelect,
}: {
  university: ScoredUniversity;
  index: number;
  onFeedback: (name: string) => void;
  isSelected: boolean;
  onToggleSelect: () => void;
  key?: React.Key;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stars = Math.floor(university.adjustedScore / 20);

  const similarUniversities = useMemo(() => {
    return getSimilarUniversities(university, 3);
  }, [university]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white dark:bg-slate-800 border-l-4 ${isSelected ? "border-blue-500" : "border-orange-500"} p-4 rounded-xl shadow-sm hover:shadow-md transition-all mb-4 cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div className="flex-1 flex items-start gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className="mt-1.5 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {index + 1}. {university.name}
              </h4>
              {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </div>
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=random&color=fff&size=128`}
                alt={`${university.name} logo`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
              <Globe size={14} /> {university.country} | Best for: <span className="font-semibold text-orange-500">{university.bestCourse}</span>
            </div>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < stars ? "currentColor" : "none"}
              className={i < stars ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-orange-500" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(university.name + ' ' + university.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            {university.location.replace("_", " ").toUpperCase()}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-orange-500" />
          <span>${university.tuition.toLocaleString()}/year</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-orange-500" />
          <span>ROI: {university.roi}/100</span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} className="text-orange-500" />
          <span>Rank: #{university.ranking}</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-orange-500" />
          <span>Scholarship: {university.scholarshipRate}%</span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-6">
              
              {/* Map Placeholder */}
              <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <Map size={24} />
                <span className="text-sm font-semibold">Map View: {university.name} Location</span>
              </div>

              {/* Program Strengths */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-orange-500" />
                  Specific Program Strengths
                </h5>
                <div className="flex flex-wrap gap-2">
                  {university.details.programStrengths.map((strength, i) => (
                    <span key={i} className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* Campus Life */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <Users size={16} className="text-orange-500" />
                  Campus Life
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {university.details.campusLife}
                </p>
              </div>

              {/* Admission Stats */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <BarChart size={16} className="text-orange-500" />
                  Admission Statistics
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Acceptance Rate</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{university.details.admissionStats.acceptanceRate}</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Avg. GPA</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{university.details.admissionStats.avgGPA}</div>
                  </div>
                  {university.details.admissionStats.avgSAT && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Avg. SAT</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{university.details.admissionStats.avgSAT}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Universities */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <Layers size={16} className="text-orange-500" />
                  Similar Universities
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {similarUniversities.map((sim, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 truncate" title={sim.name}>
                        {sim.name}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin size={10} /> {sim.location.replace('_',' ').toUpperCase()}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                        <DollarSign size={10} /> ${sim.tuition.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 gap-2">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <GraduationCap size={18} className="text-orange-500" />
          <span>AI Score: {university.adjustedScore}/100</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFeedback(university.name);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <span>💬 Feedback</span>
        </button>
      </div>
    </motion.div>
  );
}
