import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import {
  FileCode2, Activity, CheckCircle2, Plus, Upload, Code, ChevronRight, Loader2, AlertCircle, Trash2, Bug
} from 'lucide-react';
import {
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';
import api from '../https/axios';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, recentReviews, loading } = useSelector((state) => state.dashboard);
  const { theme } = useTheme();

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleDeleteClick = (review, e) => {
    e.stopPropagation();
    e.preventDefault();
    setReviewToDelete(review);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
      setIsDeleting(true);
      await api.delete(`/reviews/${reviewToDelete.id}`);
      // Refresh dashboard data instantly
      dispatch(fetchDashboardData());
      setDeleteModalOpen(false);
      setReviewToDelete(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
      // In a real app, you might show a toast error here
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-neutral-50 dark:bg-black items-center justify-center">
        <Loader2 className="w-12 h-12 text-sakura-strong dark:text-sakura-pink animate-spin" />
      </div>
    );
  }

  // --- DYNAMIC RECHARTS DATA ---
  const avgScore = stats?.averageScore || 0;
  const gaugeData = [
    { name: 'Score', value: avgScore },
    { name: 'Remaining', value: 100 - avgScore }
  ];
  const gaugeColors = ['#F9A8D4', theme === 'dark' ? '#27272a' : '#e5e7eb'];
  const sparkData = [{ v: 10 }, { v: 25 }, { v: 15 }, { v: 40 }, { v: 35 }, { v: 50 }];

  return (
    <Layout title="Overview">
      {/* 100% Height Dashboard Body (No Global Scroll) */}
      <div className="flex-1 flex flex-col p-6 md:p-8 gap-6 overflow-hidden">

        {/* 1. Hero Section + Quick Actions (Combined to save space) */}
        <section className="shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-fadeInUp">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_12px_rgba(249,168,212,0.15)]">
              Welcome back, <span className="text-pink-500 dark:text-sakura-pink">{user?.name?.split(' ')[0] || 'Developer'}</span>
            </h1>
            <p className="text-pink-900/60 dark:text-pink-100/70 mt-3 text-sm max-w-xl">
              Elevate your code quality. Live insights from your AI-powered reviews. Track scores, spot bugs, and keep your code optimized.
            </p>
          </div>

          {/* Quick Actions (Pill styled like 2nd SS) */}
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
        </section>

        {/* 2. Statistics Cards */}
        <section className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {/* Total Reviews */}
          <div className="group bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-pink-300 dark:hover:border-sakura-pink/40 hover:shadow-[0_4px_20px_rgba(236,72,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(244,114,182,0.25)] flex flex-col justify-between h-28">
            <div className="flex justify-between items-start z-10 relative">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">Total Reviews</p>
              <Activity className="w-4 h-4 text-pink-400 dark:text-sakura-pink/70" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 z-10 relative">{stats?.totalReviews || 0}</h3>
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}><Line type="monotone" dataKey="v" stroke="#F9A8D4" strokeWidth={2} dot={false} /></LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Completed */}
          <div className="group bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-400/50 hover:shadow-[0_4px_20px_rgba(52,211,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(52,211,153,0.20)] flex flex-col justify-between h-28">
            <div className="flex justify-between items-start z-10 relative">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">Completed</p>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400/70" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 z-10 relative">{stats?.statusBreakdown?.COMPLETED || 0}</h3>
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}><Line type="monotone" dataKey="v" stroke="#34D399" strokeWidth={2} dot={false} /></LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Files Reviewed */}
          <div className="group bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-pink-300 dark:hover:border-sakura-blush/50 hover:shadow-[0_4px_20px_rgba(236,72,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(251,207,232,0.25)] flex flex-col justify-between h-28">
            <div className="flex justify-between items-start z-10 relative">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">Files Reviewed</p>
              <FileCode2 className="w-4 h-4 text-pink-400 dark:text-sakura-blush/70" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 z-10 relative">{stats?.filesReviewed || 0}</h3>
          </div>

          {/* Total Findings / Issues */}
          <div className="group bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-[0_4px_20px_rgba(244,63,94,0.10)] dark:hover:shadow-[0_0_35px_rgba(244,63,94,0.20)] flex flex-col justify-between h-28">
            <div className="flex justify-between items-start z-10 relative">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">Total Findings</p>
              <Bug className="w-4 h-4 text-rose-500 dark:text-rose-500/70" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 z-10 relative">{stats?.totalFindings || 0}</h3>
          </div>
        </section>

        {/* 3. Bottom Split: Recent Reviews (scrollable) & Analytics Graph (Fixed) */}
        <section className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>

          {/* Left: Recent Reviews List */}
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
                  <Link key={review.id} to={`/report/${review.id}`} className="group block flex items-center justify-between p-4 rounded-xl bg-pink-50/50 dark:bg-black/40 border border-pink-200/30 dark:border-white/5 hover:border-pink-300 dark:hover:border-sakura-pink/40 hover:shadow-[0_4px_16px_rgba(236,72,153,0.08)] dark:hover:shadow-[0_0_20px_rgba(244,114,182,0.20)] transition-all cursor-pointer">
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
                          onClick={(e) => handleDeleteClick(review, e)}
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
                  <FileCode2 className="w-8 h-8 mb-3 opacity-50" />
                  No reviews yet. Submit your first piece of code to get started.
                </div>
              )}
            </div>
          </div>

          {/* Right: Average Score Graph */}
          <div className="bg-gradient-to-b from-pink-50 dark:from-[#1a1619] to-white dark:to-[#121214] border border-pink-200/40 dark:border-sakura-pink/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(236,72,153,0.12)] dark:hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] hover:border-pink-300 dark:hover:border-sakura-pink/50 flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Average Score</h3>
              <span className="px-2 py-0.5 bg-pink-100 dark:bg-sakura-pink/10 text-pink-500 dark:text-sakura-pink text-[10px] font-bold rounded uppercase tracking-wider border border-pink-200/40 dark:border-sakura-pink/20 animate-pulse">Live</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4 shrink-0">Code quality gauge</p>

            {/* Dynamic Recharts Circular Gauge */}
            <div className="relative flex-1 w-full flex items-center justify-center min-h-[150px] [&_*]:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart style={{ outline: 'none' }}>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="50%"
                    innerRadius="75%"
                    outerRadius="100%"
                    startAngle={225}
                    endAngle={-45}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={5}
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={gaugeColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Text inside the donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                <span className="text-5xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_10px_rgba(249,168,212,0.3)]">{avgScore}</span>
                <span className="text-[10px] text-pink-500 dark:text-sakura-pink font-semibold tracking-widest uppercase mt-2">Avg Score</span>
              </div>
            </div>
          </div>

        </section>
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