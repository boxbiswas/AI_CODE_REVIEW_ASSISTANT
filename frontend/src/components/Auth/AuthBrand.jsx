import { Cpu } from 'lucide-react';

export default function AuthBrand({ size = "large" }) {
    if (size === "small") {
        return (
            <div className="flex items-center gap-3 mb-8 animate-fadeInUp">
                <div className="bg-pink-50 dark:bg-white/5 rounded-xl p-2 animate-float shadow-[0_4px_20px_rgba(236,72,153,0.08)] dark:shadow-[0_0_20px_rgba(244,114,182,0.15)] border border-pink-200/40 dark:border-sakura-pink/20">
                    <Cpu className="w-6 h-6 text-sakura-strong dark:text-sakura-pink" />
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_10px_rgba(249,168,212,0.35)]">
                    LUMUS
                </h1>
            </div>
        );
    }

    
    return (
        <div className="flex flex-col items-center mb-8 animate-fadeInUp">
            <div className="bg-pink-50 dark:bg-white/5 rounded-2xl p-4 animate-float shadow-[0_4px_24px_rgba(236,72,153,0.08)] dark:shadow-[0_0_35px_rgba(244,114,182,0.15)] mb-4 border border-pink-200/40 dark:border-sakura-pink/20">
                <Cpu className="w-10 h-10 text-sakura-strong dark:text-sakura-pink" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_14px_rgba(249,168,212,0.35)] tracking-tight">
                LUMUS
            </h1>
            <p className="text-neutral-500 dark:text-sakura-blush-muted mt-2 text-sm tracking-wide uppercase font-medium">
                AI Code Review Assistant
            </p>
        </div>
    );
}