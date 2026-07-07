import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  pageSize, 
  onPageChange 
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-pink-200/30 dark:border-white/5 pt-6 mt-6">
      <div className="hidden sm:block">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Showing <span className="font-medium text-neutral-800 dark:text-white">{startItem}</span> to <span className="font-medium text-neutral-800 dark:text-white">{endItem}</span> of <span className="font-medium text-neutral-800 dark:text-white">{totalItems}</span> results
        </p>
      </div>
      
      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-pink-200 dark:border-white/10 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#121214] hover:bg-pink-50 dark:hover:bg-white/5 hover:text-pink-600 dark:hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-[#121214] disabled:hover:text-neutral-700 dark:disabled:hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-sakura-pink"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </button>
        
        {/* Page Numbers */}
        <div className="hidden sm:flex gap-1 items-center px-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Page <strong className="text-neutral-800 dark:text-white">{currentPage}</strong> of {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-pink-200 dark:border-white/10 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#121214] hover:bg-pink-50 dark:hover:bg-white/5 hover:text-pink-600 dark:hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-[#121214] disabled:hover:text-neutral-700 dark:disabled:hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-sakura-pink"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
