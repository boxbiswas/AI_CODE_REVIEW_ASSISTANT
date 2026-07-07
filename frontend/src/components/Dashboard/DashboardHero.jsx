// components/dashboard/DashboardHero.jsx
import QuickActions from './QuickActions';

export default function DashboardHero({ user }) {
    return (
        <section className="shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-fadeInUp">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_12px_rgba(249,168,212,0.15)]">
                    Welcome back, <span className="text-pink-500 dark:text-sakura-pink">{user?.name?.split(' ')[0] || 'Developer'}</span>
                </h1>
                <p className="text-pink-900/60 dark:text-pink-100/70 mt-3 text-sm max-w-xl">
                    Elevate your code quality. Live insights from your AI-powered reviews. Track scores, spot bugs, and keep your code optimized.
                </p>
            </div>

            <QuickActions />
        </section>
    );
}