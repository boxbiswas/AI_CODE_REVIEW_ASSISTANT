import { CheckCircle2, AlertTriangle, FileCode2, Bug, Code } from 'lucide-react';

export default function SummaryPanel({ summary, status, metrics = {} }) {
  return (
    <div className="flex-1 bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-center shadow-[0_4px_24px_rgba(236,72,153,0.08)] dark:shadow-lg relative overflow-hidden">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">AI Analysis Summary</h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </span>
      </div>
      
      <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm md:text-base max-w-4xl mb-8">
        {summary || "No summary available."}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-auto">
        
        <div className="bg-pink-50/50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <p className="text-xs uppercase font-bold tracking-wider">Critical Issues</p>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{metrics.criticalIssues || 0}</p>
        </div>

        <div className="bg-pink-50/50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <p className="text-xs uppercase font-bold tracking-wider">Maintainability</p>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{metrics.maintainabilityIndex || 0}</p>
        </div>

        <div className="bg-pink-50/50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
            <Code className="w-4 h-4" />
            <p className="text-xs uppercase font-bold tracking-wider">Total LOC</p>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{metrics.totalLOC || 0}</p>
        </div>

        <div className="bg-pink-50/50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-pink-500 dark:text-sakura-pink">
            <Bug className="w-4 h-4" />
            <p className="text-xs uppercase font-bold tracking-wider">Findings</p>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{metrics.totalFindings || 0}</p>
        </div>

        <div className="bg-pink-50/50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <FileCode2 className="w-4 h-4" />
            <p className="text-xs uppercase font-bold tracking-wider">Files</p>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{metrics.filesReviewed || 0}</p>
        </div>
        
      </div>
    </div>
  );
}
