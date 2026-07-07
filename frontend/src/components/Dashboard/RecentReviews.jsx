// components/dashboard/RecentReviews.jsx
import { Link } from 'react-router-dom';
import { Code, Trash2, ChevronRight } from 'lucide-react';

export default function RecentReviews({
    recentReviews,
    onDeleteClick
}) {
    return (
        <div className="lg:col-span-2 bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:border-pink-300 dark:hover:border-sakura-pink/30 hover:shadow-[0_4px_20px_rgba(236,72,153,0.08)] dark:hover:shadow-[0_0_35px_rgba(244,114,182,0.15)]">
            <div className="p-5 border-b border-pink-200/30 dark:border-white/5 flex items-center justify-between shrink-0 bg-white/70 dark:bg-[#121214] z-10">
                <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-50">Recent Reviews</h3>
                <Link to="/history" className="text-xs font-medium text-pink-500 dark:text-sakura-pink hover:text-pink-600 dark:hover:text-sakura-strong transition-colors flex items-center">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            {/* Inner Scrollable Area for Reviews */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {recentReviews && recentReviews.length > 0 ? (
                    recentReviews.map((review) => (
                        <Link
                            key={review.id}
                            to={`/report/${review.id}`}
                            className="group block flex items-center justify-between p-4 rounded-xl bg-pink-50/50 dark:bg-black/40 border border-pink-200/30 dark:border-white/5 hover:border-pink-300 dark:hover:border-sakura-pink/40 hover:shadow-[0_4px_16px_rgba(236,72,153,0.08)] dark:hover:shadow-[0_0_20px_rgba(244,114,182,0.20)] transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4 flex-1 overflow-hidden">
                                <div className="bg-pink-50 dark:bg-white/5 p-2 rounded-lg text-neutral-500 dark:text-neutral-400 group-hover:text-pink-500 dark:group-hover:text-sakura-pink transition-colors shrink-0">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{review.title}</h4>
                                    <p className="text-xs text-neutral-500 mt-0.5 truncate flex gap-2">
                                        <span>{review.language}</span> •
                                        <span>{review._count?.codeFiles || 0} files</span> •
                                        <span>{review._count?.findings || 0} findings</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 pl-4">
                                <div className="text-right hidden sm:block">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{review.overallScore || '--'}/100</span>
                                </div>
                                <div className="hidden md:block">
                                    {review.status === 'COMPLETED' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">Pass</span>
                                    )}
                                    {review.status === 'FAILED' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">Fail</span>
                                    )}
                                    {(review.status === 'PENDING' || review.status === 'ANALYZING' || review.status === 'AI_REVIEW') && (
                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">Wait</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => onDeleteClick(review, e)}
                                        className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors"
                                        aria-label="Delete Review"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 group-hover:text-pink-500 dark:group-hover:text-sakura-pink transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-10 text-neutral-500 text-sm border border-dashed border-pink-200/40 dark:border-white/10 rounded-xl m-2 flex flex-col items-center">
                        <Code className="w-8 h-8 mb-3 opacity-50" />
                        No reviews yet. Submit your first piece of code to get started.
                    </div>
                )}
            </div>
        </div>
    );
}