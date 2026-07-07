// pages/Dashboard.jsx (Main updated component)
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import { FileCode2, Activity, CheckCircle2, Bug } from 'lucide-react';
import api from '../https/axios';

import DeleteConfirmModal from '../components/common/DeleteConfirmModal';

import DashboardHero from '../components/dashboard/DashboardHero';
import StatCard from '../components/dashboard/StatCard';
import RecentReviews from '../components/dashboard/RecentReviews';
import ScoreGauge from '../components/dashboard/ScoreGauge';

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
            dispatch(fetchDashboardData());
            setDeleteModalOpen(false);
            setReviewToDelete(null);
        } catch (err) {
            console.error("Failed to delete review:", err);
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

    const avgScore = stats?.averageScore || 0;

    return (
        <Layout title="Overview">
            {/* 100% Height Dashboard Body (No Global Scroll) */}
            <div className="flex-1 flex flex-col p-6 md:p-8 gap-6 overflow-hidden">

                {/* 1. Hero Section + Quick Actions */}
                <DashboardHero user={user} />

                {/* 2. Statistics Cards */}
                <section className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <StatCard
                        title="Total Reviews"
                        value={stats?.totalReviews || 0}
                        icon={Activity}
                        sparkColor="#F9A8D4"
                    />

                    <StatCard
                        title="Completed"
                        value={stats?.statusBreakdown?.COMPLETED || 0}
                        icon={CheckCircle2}
                        sparkColor="#34D399"
                        className="hover:border-emerald-300 dark:hover:border-emerald-400/50 hover:shadow-[0_4px_20px_rgba(52,211,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(52,211,153,0.20)]"
                    />

                    <StatCard
                        title="Files Reviewed"
                        value={stats?.filesReviewed || 0}
                        icon={FileCode2}
                        className="hover:border-pink-300 dark:hover:border-sakura-blush/50 hover:shadow-[0_4px_20px_rgba(236,72,153,0.10)] dark:hover:shadow-[0_0_35px_rgba(251,207,232,0.25)]"
                    />

                    <StatCard
                        title="Total Findings"
                        value={stats?.totalFindings || 0}
                        icon={Bug}
                        className="hover:border-rose-300 dark:hover:border-rose-500/40 hover:shadow-[0_4px_20px_rgba(244,63,94,0.10)] dark:hover:shadow-[0_0_35px_rgba(244,63,94,0.20)]"
                    />
                </section>

                {/* 3. Bottom Split: Recent Reviews & Analytics Graph */}
                <section className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <RecentReviews
                        recentReviews={recentReviews}
                        onDeleteClick={handleDeleteClick}
                    />

                    <ScoreGauge avgScore={avgScore} theme={theme} />
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