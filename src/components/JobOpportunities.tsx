import React, { useEffect, useState } from "react";
import { Briefcase, Loader2 } from "lucide-react";
import { fetchJobOpportunities } from "../services/jobService";
import Markdown from "react-markdown";

interface Props {
  major: string;
}

export default function JobOpportunities({ major }: Props) {
  const [jobInfo, setJobInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      setIsLoading(true);
      const info = await fetchJobOpportunities(major);
      setJobInfo(info);
      setIsLoading(false);
    }
    loadJobs();
  }, [major]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-8 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (!jobInfo) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Briefcase className="text-blue-500" />
        Job Market Insights: {major}
      </h2>
      <div className="prose dark:prose-invert text-sm text-slate-600 dark:text-slate-400">
        <Markdown>{jobInfo}</Markdown>
      </div>
    </div>
  );
}
