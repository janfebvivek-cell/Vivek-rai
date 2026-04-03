import React from "react";
import { BookOpen, FileText, GraduationCap, Plane, DollarSign, Search } from "lucide-react";

export default function AdmissionGuide() {
  const steps = [
    {
      icon: Search,
      title: "1. Research & Shortlist",
      description: "Use UniMind AI to find universities that match your major, budget, and location preferences."
    },
    {
      icon: BookOpen,
      title: "2. Standardized Tests",
      description: "Prepare for required exams (SAT/ACT for BTech, MCAT for Medicine, IELTS/TOEFL for English proficiency)."
    },
    {
      icon: FileText,
      title: "3. Prepare Application",
      description: "Draft compelling essays, gather Letters of Recommendation (LORs), and update your resume."
    },
    {
      icon: GraduationCap,
      title: "4. Submit Application",
      description: "Apply through platforms like Common App or directly via university portals before deadlines."
    },
    {
      icon: DollarSign,
      title: "5. Financial Aid",
      description: "Apply for scholarships, grants, and financial aid packages offered by the university or external organizations."
    },
    {
      icon: Plane,
      title: "6. Visa Process",
      description: "Once accepted, prepare your documents and apply for your student visa (e.g., F-1 for USA)."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mt-8">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Step-by-Step Admission Guide</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <step.icon className="text-orange-500 mb-4" size={32} />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
