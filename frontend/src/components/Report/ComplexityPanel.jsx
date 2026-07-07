import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function ComplexityPanel({ data }) {
  const { theme } = useTheme();

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 shadow-[0_4px_24px_rgba(236,72,153,0.06)] rounded-3xl h-full animate-fadeInUp">
        <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">No Complexity Data</h3>
        <p className="text-sm text-neutral-500">Complexity analysis was not generated for this review.</p>
      </div>
    );
  }

  const summaryMetrics = [
    { label: 'Total LOC', value: data.linesOfCode || 0, suffix: '' },
    { label: 'Functions', value: data.functionCount || 0, suffix: '' },
    { label: 'Classes', value: data.classCount || 0, suffix: '' },
    { label: 'Max Cyclomatic', value: data.cyclomaticComplexity || 0, suffix: '', highlight: data.cyclomaticComplexity > 20 ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Maintainability', value: data.maintainability || 0, suffix: '/100', highlight: data.maintainability < 65 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400' },
  ];

  const files = (data.breakdown || []).map(file => ({
    name: file.fileName,
    complexity: file.cyclomaticComplexity
  }));

  const axisColor = theme === 'dark' ? '#52525b' : '#a3a3a3';
  const tooltipBg = theme === 'dark' ? '#18181b' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#3f3f46' : '#fce7f3';

  return (
    <div className="flex flex-col gap-6 animate-fadeInUp">
      
      {/* Summary Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl p-6 shadow-[0_4px_24px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
             <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">{metric.label}</h4>
             <span className={`text-3xl font-bold ${metric.highlight || 'text-neutral-900 dark:text-neutral-50'}`}>
               {metric.value}<span className="text-lg text-neutral-400 dark:text-neutral-500">{metric.suffix}</span>
             </span>
          </div>
        ))}
      </div>

      {/* Supporting Chart */}
      <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl p-6 lg:p-8 shadow-[0_4px_24px_rgba(236,72,153,0.06)]">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Complexity by File</h3>
          <p className="text-sm text-neutral-500">Visualizing cyclomatic complexity to identify potential refactoring targets.</p>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={files} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: theme === 'dark' ? '#ffffff0a' : '#fce7f320' }} 
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }} 
                itemStyle={{ color: '#F9A8D4' }}
              />
              <Bar dataKey="complexity" fill="#F9A8D4" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
