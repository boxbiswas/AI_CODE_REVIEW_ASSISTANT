import { useMemo } from 'react';
import { ShieldAlert, Zap, Code2, AlertOctagon, AlertTriangle, Info } from 'lucide-react';

export default function AISuggestionsPanel({ suggestions }) {
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'security': return <ShieldAlert className="w-5 h-5 text-rose-500 dark:text-rose-400" aria-hidden="true" />;
      case 'performance': return <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" aria-hidden="true" />;
      default: return <Code2 className="w-5 h-5 text-pink-500 dark:text-sakura-pink" aria-hidden="true" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20';
      case 'medium': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20';
      case 'low': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20';
      default: return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-400/10 border-neutral-200 dark:border-neutral-400/20';
    }
  };

  const stats = useMemo(() => {
    const high = suggestions.filter(s => s.priority?.toLowerCase() === 'high').length;
    const medium = suggestions.filter(s => s.priority?.toLowerCase() === 'medium').length;
    const low = suggestions.filter(s => s.priority?.toLowerCase() === 'low').length;
    return { high, medium, low };
  }, [suggestions]);

  return (
    <div className="flex flex-col gap-6 animate-fadeInUp">
      
      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-rose-300 dark:hover:border-rose-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">High Priority</h4>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.high}</span>
        </div>
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-amber-300 dark:hover:border-amber-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Medium Priority</h4>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.medium}</span>
        </div>
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Low Priority</h4>
            <Info className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.low}</span>
        </div>
      </div>
      {suggestions.map((suggestion, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-pink-300 dark:hover:border-sakura-pink/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-4 transition-all shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm"
        >
          {/* Icon Column */}
          <div className="p-3 bg-pink-50 dark:bg-white/5 rounded-xl shrink-0 self-start">
            {getCategoryIcon(suggestion.category)}
          </div>
          
          {/* Content Column */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-pink-50 dark:bg-white/5 px-2 py-0.5 rounded border border-pink-200/30 dark:border-white/5">
                {suggestion.category}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityColor(suggestion.priority)}`}>
                {suggestion.priority} Priority
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">{suggestion.title}</h3>
            
            <div className="mb-4 space-y-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-4xl">
              <div>
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Issue:</span> {suggestion.description}
              </div>
              {suggestion.whyItMatters && (
                <div>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">Why it matters:</span> {suggestion.whyItMatters}
                </div>
              )}
            </div>
            
            {/* Snippet Block */}
            {suggestion.snippet && (
              <div className="mt-4 bg-neutral-50 dark:bg-[#0a0a0a] border border-pink-200/30 dark:border-white/10 rounded-lg p-4 overflow-x-auto">
                <p className="text-xs text-neutral-500 mb-2 uppercase font-bold tracking-wider">Suggested Fix</p>
                <code className="text-sm font-mono text-pink-600 dark:text-sakura-pink whitespace-pre">
                  {suggestion.snippet}
                </code>
                <button className="mt-4 md:mt-0 flex items-center gap-1 text-xs font-medium text-pink-500 dark:text-sakura-pink opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {suggestions.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 shadow-[0_4px_24px_rgba(236,72,153,0.06)] rounded-2xl">
          <p className="text-neutral-500 text-sm">No AI suggestions at this time.</p>
        </div>
      )}
    </div>
  );
}
