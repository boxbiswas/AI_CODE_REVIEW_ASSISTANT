// components/dashboard/StatCard.jsx
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export default function StatCard({ title, value, icon: Icon, sparkColor, className = '' }) {
    const sparkData = [{ v: 10 }, { v: 25 }, { v: 15 }, { v: 40 }, { v: 35 }, { v: 50 }];

    return (
        <div className={`group bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-pink-300 dark:hover:border-sakura-pink/40 hover:shadow-[0_4px_20px_rgba(236,72,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(244,114,182,0.25)] flex flex-col justify-between h-28 ${className}`}>
            <div className="flex justify-between items-start z-10 relative">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">{title}</p>
                {Icon && <Icon className="w-4 h-4 text-pink-400 dark:text-sakura-pink/70" />}
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 z-10 relative">{value}</h3>
            {sparkColor && (
                <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparkData}>
                            <Line type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}