// components/dashboard/QuickActions.jsx
import { Link } from 'react-router-dom';
import { Plus, Code, Upload } from 'lucide-react';

export default function QuickActions() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Link to="/new-review" className="bg-pink-500 dark:bg-sakura-pink text-white dark:text-black px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_4px_20px_rgba(236,72,153,0.30)] dark:hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:scale-105 transition-all text-sm">
                <Plus className="w-4 h-4" /> New Review
            </Link>
            <Link to="/new-review" state={{ tab: 'paste' }} className="bg-white dark:bg-transparent border border-pink-200 dark:border-white/20 text-neutral-700 dark:text-neutral-200 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:border-pink-300 dark:hover:border-sakura-pink/50 hover:text-pink-600 dark:hover:text-sakura-pink hover:bg-pink-50 dark:hover:bg-transparent dark:hover:shadow-[0_0_15px_rgba(244,114,182,0.15)] transition-all text-sm">
                <Code className="w-4 h-4" /> Paste Code
            </Link>
            <Link to="/new-review" state={{ tab: 'upload' }} className="bg-white dark:bg-transparent border border-pink-200 dark:border-white/20 text-neutral-700 dark:text-neutral-200 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:border-pink-300 dark:hover:border-sakura-pink/50 hover:text-pink-600 dark:hover:text-sakura-pink hover:bg-pink-50 dark:hover:bg-transparent dark:hover:shadow-[0_0_15px_rgba(244,114,182,0.15)] transition-all text-sm hidden sm:flex">
                <Upload className="w-4 h-4" /> Upload Files
            </Link>
        </div>
    );
}