import { useState, useMemo } from 'react';
import { Search, FileCode2, Filter, AlertOctagon, AlertTriangle, Info, ChevronDown } from 'lucide-react';

export default function FindingsTable({ findings }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [fileFilter, setFileFilter] = useState('All');

  const [isSeverityMenuOpen, setIsSeverityMenuOpen] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  // Extract unique files for the dropdown
  const uniqueFiles = useMemo(() => {
    const files = new Set(findings.map(f => f.fileName).filter(Boolean));
    return ['All', ...Array.from(files)];
  }, [findings]);

  const normalizeSeverity = (severity) => {
    if (!severity) return 'Info';
    const s = severity.toUpperCase();
    if (s === 'CRITICAL' || s === 'HIGH') return 'Critical';
    if (s === 'WARNING' || s === 'MEDIUM') return 'Warning';
    if (s === 'INFO' || s === 'LOW') return 'Info';
    return 'Info';
  };

  const filteredFindings = useMemo(() => {
    return findings.filter(f => {
      const desc = f.description || '';
      const file = f.fileName || '';
      const type = f.type || '';
      const capSeverity = normalizeSeverity(f.severity);

      const searchTarget = `${desc} ${file} ${capSeverity} ${type}`.toLowerCase();
      const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
      
      const matchesSeverity = severityFilter === 'All' || capSeverity === severityFilter;
      const matchesFile = fileFilter === 'All' || file === fileFilter;
      
      return matchesSearch && matchesSeverity && matchesFile;
    });
  }, [findings, searchQuery, severityFilter, fileFilter]);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20';
      case 'Warning': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20';
      case 'Info': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20';
      default: return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-400/10 border-neutral-200 dark:border-neutral-400/20';
    }
  };

  const stats = useMemo(() => {
    const critical = findings.filter(f => normalizeSeverity(f.severity) === 'Critical').length;
    const warning = findings.filter(f => normalizeSeverity(f.severity) === 'Warning').length;
    const info = findings.filter(f => normalizeSeverity(f.severity) === 'Info').length;
    return { critical, warning, info };
  }, [findings]);

  return (
    <div className="flex flex-col h-full animate-fadeInUp gap-6">
      
      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-rose-300 dark:hover:border-rose-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_20px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Critical</h4>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.critical}</span>
        </div>
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-amber-300 dark:hover:border-amber-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_20px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Warning</h4>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.warning}</span>
        </div>
        <div className="bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 rounded-2xl p-6 transition-all shadow-[0_4px_20px_rgba(236,72,153,0.06)] dark:shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Info</h4>
            <Info className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{stats.info}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(236,72,153,0.08)] dark:shadow-lg p-1">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 p-4 shrink-0 border-b border-pink-100 dark:border-white/5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
          <input 
            type="text" 
            placeholder="Search findings (e.g. info, warning, filename)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-pink-50/30 dark:bg-[#0a0a0a] border border-pink-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-pink-400 dark:focus:border-sakura-pink/50 focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all shadow-inner dark:shadow-none"
            aria-label="Search findings"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 relative">
          
          {/* Severity Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsSeverityMenuOpen(!isSeverityMenuOpen);
                setIsFileMenuOpen(false);
              }}
              className="flex items-center justify-between gap-2 bg-pink-50/50 dark:bg-[#121214] border border-pink-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:border-pink-300 dark:hover:border-sakura-pink/50 focus:outline-none focus:border-pink-400 dark:focus:border-sakura-pink/50 focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all min-w-[150px] shadow-sm"
              aria-label="Filter by Severity"
            >
              <div className="flex items-center">
                <Filter className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mr-2" aria-hidden="true" />
                {severityFilter === 'All' ? 'All Severities' : severityFilter}
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
            </button>
            
            {isSeverityMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSeverityMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1c] border border-pink-200 dark:border-white/10 rounded-xl shadow-[0_4px_30px_rgba(236,72,153,0.15)] dark:shadow-2xl z-20 py-1 overflow-hidden" role="listbox">
                  {['All', 'Critical', 'Warning', 'Info'].map((opt) => (
                    <button
                      key={opt}
                      role="option"
                      aria-selected={severityFilter === opt}
                      onClick={() => {
                        setSeverityFilter(opt);
                        setIsSeverityMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none ${
                        severityFilter === opt ? 'bg-pink-500 text-white dark:bg-sakura-pink/10 dark:text-sakura-pink font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {opt === 'All' ? 'All Severities' : opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* File Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsFileMenuOpen(!isFileMenuOpen);
                setIsSeverityMenuOpen(false);
              }}
              className="flex items-center justify-between gap-2 bg-pink-50/50 dark:bg-[#121214] border border-pink-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:border-pink-300 dark:hover:border-sakura-pink/50 focus:outline-none focus:border-pink-400 dark:focus:border-sakura-pink/50 focus:ring-1 focus:ring-pink-400/50 dark:focus:ring-sakura-pink transition-all min-w-[150px] shadow-sm"
              aria-label="Filter by File"
            >
              <div className="flex items-center max-w-[150px]">
                <FileCode2 className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" aria-hidden="true" />
                <span className="truncate">{fileFilter}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-400 dark:text-neutral-500 shrink-0" />
            </button>
            
            {isFileMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFileMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-64 max-h-60 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1a1a1c] border border-pink-200 dark:border-white/10 rounded-xl shadow-[0_4px_30px_rgba(236,72,153,0.15)] dark:shadow-2xl z-20 py-1" role="listbox">
                  {uniqueFiles.map((file) => (
                    <button
                      key={file}
                      role="option"
                      aria-selected={fileFilter === file}
                      onClick={() => {
                        setFileFilter(file);
                        setIsFileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none truncate ${
                        fileFilter === file ? 'bg-pink-500 text-white dark:bg-sakura-pink/10 dark:text-sakura-pink font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

        {/* Table Container with Sticky Header */}
        <div className="overflow-auto flex-1 custom-scrollbar min-h-0 relative bg-white dark:bg-transparent">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-pink-50/80 dark:bg-black/80 backdrop-blur-md border-b border-pink-200/50 dark:border-white/5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-xs font-semibold sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">File / Line</th>
                <th className="px-6 py-4 w-full">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100 dark:divide-white/5">
              {filteredFindings.map((f) => {
                const capSeverity = normalizeSeverity(f.severity);
                return (
                <tr key={f.id} className="hover:bg-pink-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${getSeverityColor(capSeverity)}`}>
                      {capSeverity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300 font-medium">{f.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                      <FileCode2 className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-pink-500 dark:group-hover:text-sakura-pink transition-colors" aria-hidden="true" />
                      <span>{f.fileName || 'Unknown'} <span className="text-pink-500/70 dark:text-sakura-pink/70">:{f.lineNumber || '?'}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300 truncate max-w-[200px] md:max-w-md lg:max-w-xl" title={f.description}>
                    {f.description}
                  </td>
                </tr>
                );
              })}
              {filteredFindings.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center bg-white dark:bg-transparent">
                    <p className="text-neutral-500 text-sm mb-2">No findings match your filters.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSeverityFilter('All'); setFileFilter('All'); }}
                      className="text-pink-500 dark:text-sakura-pink text-sm font-semibold hover:underline focus:outline-none bg-pink-50 dark:bg-white/5 px-4 py-2 rounded-xl transition-colors"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
