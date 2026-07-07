import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import HistoryFilters from '../components/History/HistoryFilters';
import ReviewCard from '../components/History/ReviewCard';
import Pagination from '../components/History/Pagination';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
import { Archive, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../https/axios';

export default function History() {
  const [reviews, setReviews] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1, totalReviews: 0, pageSize: 10 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [langFilter, setLangFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // When filters change, reset pagination to page 1
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaginationInfo(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch, statusFilter, langFilter, typeFilter]);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/history', {
        params: {
          page: paginationInfo.currentPage,
          limit: paginationInfo.pageSize,
          search: debouncedSearch || undefined,
          status: statusFilter === 'All' ? undefined : statusFilter,
          language: langFilter === 'All' ? undefined : langFilter,
          submissionType: typeFilter === 'All' ? undefined : typeFilter
        }
      });
      setReviews(res.data.data);
      setPaginationInfo({
        currentPage: res.data.meta.page,
        totalPages: res.data.meta.totalPages,
        totalReviews: res.data.meta.total,
        pageSize: res.data.meta.limit
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load history data.');
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.currentPage, paginationInfo.pageSize, debouncedSearch, statusFilter, langFilter, typeFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHistory();
  }, [fetchHistory]);

  const handleDeleteClick = (id) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      setReviewToDelete(review);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
      setIsDeleting(true);
      await api.delete(`/reviews/${reviewToDelete.id}`);
      // Refresh list
      await fetchHistory();
      setDeleteModalOpen(false);
      setReviewToDelete(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPaginationInfo(prev => ({ ...prev, currentPage: newPage }));
  };

  return (
    <Layout title="History">
      {/* 100vh constraint via Layout flex-1 */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        
        <div className="mb-6 shrink-0">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Review History</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">Browse, filter, and manage your past AI code reviews.</p>
        </div>

        <HistoryFilters 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          langFilter={langFilter} setLangFilter={setLangFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        />

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar min-h-0">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500">
              <Loader2 className="w-10 h-10 animate-spin text-pink-500 dark:text-sakura-pink mb-4" />
              <p>Loading history...</p>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/5 rounded-2xl border border-rose-200 dark:border-rose-400/20 p-8">
              <AlertTriangle className="w-12 h-12 mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
              <p className="text-sm opacity-80">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-100 dark:bg-rose-400/20 rounded-xl text-rose-600 dark:text-rose-300 font-bold hover:bg-rose-200 dark:hover:bg-rose-400/30 transition-colors">Retry</button>
            </div>
          ) : reviews.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-12 text-center">
              <Archive className="w-16 h-16 mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">No Reviews Found</h3>
              <p className="text-sm max-w-sm mb-6">We couldn't find any reviews matching your current filters and search query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setStatusFilter('All'); setLangFilter('All'); setTypeFilter('All'); }}
                className="text-pink-500 dark:text-sakura-pink text-sm font-bold hover:underline focus:outline-none"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-fadeInUp">
              {reviews.map(review => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  onDelete={handleDeleteClick} 
                />
              ))}
              
              <Pagination 
                currentPage={paginationInfo.currentPage}
                totalPages={paginationInfo.totalPages}
                totalItems={paginationInfo.totalReviews}
                pageSize={paginationInfo.pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={reviewToDelete?.title || 'this review'}
        isDeleting={isDeleting}
      />
    </Layout>
  );
}
