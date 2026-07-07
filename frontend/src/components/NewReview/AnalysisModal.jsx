import { X, Loader2 } from 'lucide-react';

export default function AnalysisModal({
    isAnalyzing,
    pipelineError,
    pipelineStatus,
    getProgressMessage,
    onClose
}) {
    if (!isAnalyzing) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
            <div className="bg-white dark:bg-[#121214] border border-pink-200/40 dark:border-white/10 rounded-3xl p-8 max-w-md w-full flex flex-col items-center text-center shadow-[0_4px_40px_rgba(236,72,153,0.10)] dark:shadow-2xl">
                {pipelineError ? (
                    <>
                        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-200 dark:border-rose-500/20">
                            <X className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Analysis Failed</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">{pipelineError}</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-pink-50 dark:bg-white/5 hover:bg-pink-100 dark:hover:bg-white/10 border border-pink-200 dark:border-white/10 rounded-xl text-sm font-bold transition-colors w-full text-neutral-700 dark:text-neutral-200"
                        >
                            Retry Submission
                        </button>
                    </>
                ) : (
                    <>
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-2 border-pink-200 dark:border-white/5 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-pink-500 dark:text-sakura-pink animate-spin" />
                            </div>
                            <div className="absolute inset-0 rounded-full border border-pink-300 dark:border-sakura-pink/30 animate-ping opacity-50"></div>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Analyzing Code</h3>
                        <p className="text-sm font-medium text-pink-500 dark:text-sakura-pink mb-4 animate-pulse">
                            {getProgressMessage()}
                        </p>
                        <p className="text-xs text-neutral-500">Please wait while our models analyze your codebase. This usually takes 10-30 seconds.</p>
                    </>
                )}
            </div>
        </div>
    );
}