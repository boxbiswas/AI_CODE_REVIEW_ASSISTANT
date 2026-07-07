import { Calendar, Trash2, ArrowRight, FileCode2, Code, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReviewCard({ review, onDelete }) {
  const {
    id, title, description, language, submissionType, overallScore,
    status, createdAt, lastUpdated, _count
  } = review;

  const findingsCount = _count?.findings || 0;
  const filesReviewed = _count?.codeFiles || 0;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20';
      case 'Analyzing': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20 animate-pulse';
      case 'Failed': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20';
      default: return 'text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-400/10 border-neutral-200 dark:border-neutral-400/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 hover:border-pink-300 dark:hover:border-sakura-pink/30 rounded-2xl p-6 transition-all shadow-sm group flex flex-col md:flex-row gap-6">
      
      {/* Left: Score & Meta */}
      <div className="flex flex-col items-center justify-center w-full md:w-32 shrink-0 border-r-0 md:border-r border-pink-200/30 dark:border-white/5 pr-0 md:pr-6 pb-6 md:pb-0 border-b md:border-b-0">
        {overallScore !== null ? (
          <div className="relative w-20 h-20 rounded-full border-4 flex items-center justify-center mb-2" 
               style={{ borderColor: overallScore >= 80 ? '#34d399' : overallScore >= 50 ? '#fbbf24' : '#fb7185' }}>
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{overallScore}</span>
          </div>
        ) : (
          <div className="relative w-20 h-20 rounded-full border-4 border-pink-200 dark:border-white/10 flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-neutral-400 dark:text-neutral-500">N/A</span>
          </div>
        )}
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Middle: Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-xs font-bold text-pink-500 dark:text-sakura-pink">{language}</span>
          <span className="text-neutral-300 dark:text-neutral-600">•</span>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            {submissionType === 'FILE_UPLOAD' ? <FileCode2 className="w-3 h-3" /> : <Code className="w-3 h-3" />}
            {submissionType === 'FILE_UPLOAD' ? 'Files' : 'Pasted'}
          </span>
          <span className="text-neutral-300 dark:text-neutral-600">•</span>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Bug className="w-3 h-3 text-rose-500 dark:text-rose-400" /> {findingsCount} Findings
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 truncate">{title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 max-w-3xl">{description}</p>
        
        <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 mt-auto">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Created {formatDate(createdAt)}</span>
          {lastUpdated && <span>Updated {formatDate(lastUpdated)}</span>}
          {filesReviewed > 0 && <span>• {filesReviewed} Files</span>}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex md:flex-col items-center justify-end gap-3 md:w-32 shrink-0 border-t md:border-t-0 border-pink-200/30 dark:border-white/5 pt-4 md:pt-0">
        <Link 
          to={`/report/${id}`}
          className="flex-1 w-full flex items-center justify-center gap-2 bg-pink-500 dark:bg-sakura-pink text-white dark:text-black px-4 py-2.5 rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(236,72,153,0.15)] dark:shadow-[0_0_15px_rgba(244,114,182,0.2)] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-sakura-pink focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121214]"
        >
          Open <ArrowRight className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => onDelete(id)}
          className="flex-1 w-full flex items-center justify-center gap-2 bg-transparent text-rose-500 dark:text-rose-400 hover:text-white hover:bg-rose-500/20 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border border-rose-300 dark:border-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

    </div>
  );
}
