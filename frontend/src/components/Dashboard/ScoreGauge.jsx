// components/dashboard/ScoreGauge.jsx
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

export default function ScoreGauge({ avgScore, theme }) {
    const gaugeData = [
        { name: 'Score', value: avgScore },
        { name: 'Remaining', value: 100 - avgScore }
    ];
    const gaugeColors = ['#F9A8D4', theme === 'dark' ? '#27272a' : '#e5e7eb'];

    return (
        <div className="bg-gradient-to-b from-pink-50 dark:from-[#1a1619] to-white dark:to-[#121214] border border-pink-200/40 dark:border-sakura-pink/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(236,72,153,0.12)] dark:hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] hover:border-pink-300 dark:hover:border-sakura-pink/50 flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Average Score</h3>
                <span className="px-2 py-0.5 bg-pink-100 dark:bg-sakura-pink/10 text-pink-500 dark:text-sakura-pink text-[10px] font-bold rounded uppercase tracking-wider border border-pink-200/40 dark:border-sakura-pink/20 animate-pulse">Live</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4 shrink-0">Code quality gauge</p>

            {/* Dynamic Recharts Circular Gauge */}
            <div className="relative flex-1 w-full flex items-center justify-center min-h-[150px] [&_*]:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart style={{ outline: 'none' }}>
                        <Pie
                            data={gaugeData}
                            cx="50%"
                            cy="50%"
                            innerRadius="75%"
                            outerRadius="100%"
                            startAngle={225}
                            endAngle={-45}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={5}
                        >
                            {gaugeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={gaugeColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Text inside the donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <span className="text-5xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_10px_rgba(249,168,212,0.3)]">{avgScore}</span>
                    <span className="text-[10px] text-pink-500 dark:text-sakura-pink font-semibold tracking-widest uppercase mt-2">Avg Score</span>
                </div>
            </div>
        </div>
    );
}