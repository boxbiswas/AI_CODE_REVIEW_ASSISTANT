import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp">
      {/* Strengths */}
      <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl p-6 hover:border-emerald-300 dark:hover:border-emerald-500/20 transition-colors shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm h-full">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> Strengths
        </h3>
        <ul className="space-y-4">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2 shrink-0"></div>
              <span className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{s}</span>
            </li>
          ))}
          {strengths.length === 0 && (
            <li className="text-neutral-400 dark:text-neutral-500 text-sm">No notable strengths identified.</li>
          )}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl p-6 hover:border-rose-300 dark:hover:border-rose-500/20 transition-colors shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm h-full">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400" /> Weaknesses
        </h3>
        <ul className="space-y-4">
          {weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400 mt-2 shrink-0"></div>
              <span className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{w}</span>
            </li>
          ))}
          {weaknesses.length === 0 && (
            <li className="text-neutral-400 dark:text-neutral-500 text-sm">No critical weaknesses identified.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
