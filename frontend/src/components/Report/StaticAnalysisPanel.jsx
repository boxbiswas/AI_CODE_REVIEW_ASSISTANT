import { useState } from 'react';
import { AlertTriangle, Info, ShieldAlert, Code2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const CategoryCard = ({ title, data, icon: Icon, color, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`bg-white dark:bg-[#121214] border rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all group focus:outline-none focus:ring-2 focus:ring-pink-400/50 dark:focus:ring-sakura-pink/50 ${
      isActive ? 'border-pink-300 dark:border-white/20 bg-pink-50 dark:bg-white/5 scale-105 shadow-[0_4px_24px_rgba(236,72,153,0.15)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]' : 'border-pink-200 dark:border-white/5 shadow-[0_4px_24px_rgba(236,72,153,0.06)] hover:border-pink-300 dark:hover:border-white/20 hover:scale-105'
    }`}
    aria-expanded={isActive}
    aria-controls={`details-${title}`}
  >
    <div className={`p-3 rounded-xl bg-pink-50 dark:bg-white/5 mb-3 ${color} group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
    <h4 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">{data.count}</h4>
    <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">{title}</p>
    
    <div className="mt-4 text-neutral-400 dark:text-neutral-600 opacity-50 group-hover:opacity-100 transition-opacity">
      {isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </div>
  </button>
);

export default function StaticAnalysisPanel({ data }) {
  const [activeCategory, setActiveCategory] = useState(null);

  // If there's no data or it's not an array, show empty state
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 shadow-[0_4px_24px_rgba(236,72,153,0.06)] rounded-3xl h-full animate-fadeInUp">
        <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">No Static Analysis Data</h3>
        <p className="text-sm text-neutral-500">Static analysis yielded no results or was not run.</p>
      </div>
    );
  }

  // Parse raw ESLint output into our categories
  const parsedData = {
    errors: { count: 0, details: [] },
    warnings: { count: 0, details: [] },
    security: { count: 0, details: [] },
    formatting: { count: 0, details: [] },
    unusedVariables: { count: 0, details: [] }
  };

  data.forEach(result => {
    const filename = result.filePath ? result.filePath.split(/[/\\]/).pop() : 'unknown';
    
    (result.messages || []).forEach(msg => {
      const detailStr = `${filename}:${msg.line || '?'} - ${msg.message}`;
      const rule = msg.ruleId || '';

      if (rule.includes('security') || rule.includes('crypto')) {
        parsedData.security.count++;
        parsedData.security.details.push(detailStr);
      } else if (rule === 'no-unused-vars') {
        parsedData.unusedVariables.count++;
        parsedData.unusedVariables.details.push(detailStr);
      } else if (rule.includes('indent') || rule.includes('quotes') || rule.includes('spacing') || rule.includes('semi')) {
        parsedData.formatting.count++;
        parsedData.formatting.details.push(detailStr);
      } else if (msg.severity === 2) {
        parsedData.errors.count++;
        parsedData.errors.details.push(detailStr);
      } else {
        parsedData.warnings.count++;
        parsedData.warnings.details.push(detailStr);
      }
    });
  });

  const categories = [
    { id: 'errors', title: 'Errors', data: parsedData.errors, icon: AlertTriangle, color: 'text-rose-400' },
    { id: 'warnings', title: 'Warnings', data: parsedData.warnings, icon: Info, color: 'text-amber-400' },
    { id: 'security', title: 'Security', data: parsedData.security, icon: ShieldAlert, color: 'text-rose-500' },
    { id: 'formatting', title: 'Formatting', data: parsedData.formatting, icon: Code2, color: 'text-blue-400' },
    { id: 'unusedVariables', title: 'Unused Vars', data: parsedData.unusedVariables, icon: Trash2, color: 'text-neutral-400' },
  ];

  const activeData = activeCategory ? categories.find(c => c.id === activeCategory) : null;

  return (
    <div className="flex flex-col gap-6 animate-fadeInUp">
      
      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.id}
            {...cat}
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
          />
        ))}
      </div>

      {/* Expanded Details Section */}
      {activeData && (
        <div 
          id={`details-${activeData.title}`}
          className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl p-6 lg:p-8 shadow-[0_4px_24px_rgba(236,72,153,0.08)] dark:shadow-lg animate-fadeInUp"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-pink-200/30 dark:border-white/5">
            <div className={`p-2 rounded-lg bg-pink-50 dark:bg-white/5 ${activeData.color}`}>
              <activeData.icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{activeData.title} Details</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Found {activeData.data.count} issue{activeData.data.count === 1 ? '' : 's'} in this category.</p>
            </div>
          </div>

          {activeData.data.details.length > 0 ? (
            <ul className="space-y-3">
              {activeData.data.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-pink-50/50 dark:bg-black/40 border border-pink-200/30 dark:border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${activeData.color.replace('text-', 'bg-')}`}></div>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm font-mono leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-500 text-sm">No issues found in this category. Great job!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
