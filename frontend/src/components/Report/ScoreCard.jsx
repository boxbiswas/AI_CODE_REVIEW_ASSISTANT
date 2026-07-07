import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function ScoreCard({ score }) {
  const { theme } = useTheme();
  const emptyColor = theme === 'dark' ? '#27272a' : '#e5e7eb';

  return (
    <div className="bg-gradient-to-b from-pink-50 dark:from-[#1a1619] to-white dark:to-[#121214] border border-pink-200/40 dark:border-sakura-pink/20 rounded-3xl p-6 w-full h-full flex flex-col items-center justify-center relative overflow-hidden group">
      <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 absolute top-6 left-6">Overall Score</h3>
      
      <div className="relative w-32 h-32 mt-6 [&_*]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ outline: 'none' }}>
            <Pie
              data={[{value: score}, {value: 100 - score}]}
              cx="50%" cy="50%"
              innerRadius="80%" outerRadius="100%"
              startAngle={225} endAngle={-45}
              dataKey="value" stroke="none" cornerRadius={5}
            >
              <Cell fill="#F9A8D4" />
              <Cell fill={emptyColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col mt-2">
          <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">{score}</span>
        </div>
      </div>
      
      <p className="text-xs text-pink-500 dark:text-sakura-pink uppercase tracking-widest font-bold mt-2">
        {score < 50 ? 'Critical' : score < 80 ? 'Needs Improvement' : 'Excellent'}
      </p>
    </div>
  );
}
