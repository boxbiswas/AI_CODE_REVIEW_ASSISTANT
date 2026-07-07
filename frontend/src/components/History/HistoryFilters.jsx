import { useState } from 'react';
import { Search, Filter, ChevronDown, FileCode2, Code } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ANALYZING', label: 'Analyzing' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'PENDING', label: 'Pending' }
];

const LANG_OPTIONS = [
  { value: 'All', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' }
];

const TYPE_OPTIONS = [
  { value: 'All', label: 'All Types' },
  { value: 'FILE_UPLOAD', label: 'Files' },
  { value: 'PASTED_CODE', label: 'Snippet' }
];

export default function HistoryFilters({ 
  searchQuery, setSearchQuery, 
  statusFilter, setStatusFilter, 
  langFilter, setLangFilter,
  typeFilter, setTypeFilter 
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'status', 'lang', 'type'

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const getLabel = (options, value) => {
    return options.find(opt => opt.value === value)?.label || 'Select...';
  };

  return (
    <div className="bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-4 md:p-6 mb-6 shadow-sm sticky top-0 z-10 flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
        <input 
          type="text" 
          placeholder="Search by title, language, or status..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-[#0a0a0a] border border-pink-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-pink-400 dark:focus:border-sakura-pink/50 focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all"
          aria-label="Search reviews"
        />
      </div>

      {/* Custom Dropdown Filters */}
      <div className="flex flex-wrap gap-4 relative">
        
        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('status')}
            className="flex items-center justify-between gap-2 bg-white dark:bg-[#0a0a0a] border border-pink-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:border-pink-300 dark:hover:border-sakura-pink/50 focus:outline-none focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all min-w-[140px]"
          >
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-neutral-400 mr-2" />
              {getLabel(STATUS_OPTIONS, statusFilter)}
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </button>
          
          {openDropdown === 'status' && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute right-0 md:left-0 mt-2 w-48 bg-white dark:bg-[#1a1a1c] border border-pink-200/40 dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl z-20 py-1 overflow-hidden">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setStatusFilter(opt.value); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none ${
                      statusFilter === opt.value ? 'bg-pink-50 dark:bg-sakura-pink/10 text-pink-600 dark:text-sakura-pink font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('lang')}
            className="flex items-center justify-between gap-2 bg-white dark:bg-[#0a0a0a] border border-pink-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:border-pink-300 dark:hover:border-sakura-pink/50 focus:outline-none focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all min-w-[140px]"
          >
            <div className="flex items-center">
              <Code className="w-4 h-4 text-neutral-400 mr-2" />
              {getLabel(LANG_OPTIONS, langFilter)}
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </button>
          
          {openDropdown === 'lang' && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute right-0 md:left-0 mt-2 w-48 bg-white dark:bg-[#1a1a1c] border border-pink-200/40 dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl z-20 py-1 max-h-60 overflow-y-auto custom-scrollbar">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setLangFilter(opt.value); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none ${
                      langFilter === opt.value ? 'bg-pink-50 dark:bg-sakura-pink/10 text-pink-600 dark:text-sakura-pink font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Submission Type Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('type')}
            className="flex items-center justify-between gap-2 bg-white dark:bg-[#0a0a0a] border border-pink-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:border-pink-300 dark:hover:border-sakura-pink/50 focus:outline-none focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all min-w-[140px]"
          >
            <div className="flex items-center">
              <FileCode2 className="w-4 h-4 text-neutral-400 mr-2" />
              {getLabel(TYPE_OPTIONS, typeFilter)}
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </button>
          
          {openDropdown === 'type' && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1c] border border-pink-200/40 dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl z-20 py-1 overflow-hidden">
                {TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setTypeFilter(opt.value); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none ${
                      typeFilter === opt.value ? 'bg-pink-50 dark:bg-sakura-pink/10 text-pink-600 dark:text-sakura-pink font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
