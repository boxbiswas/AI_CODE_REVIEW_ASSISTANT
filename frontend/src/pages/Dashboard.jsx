import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser, logout } from '../redux/slices/authSlice';
import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import { 
  LayoutDashboard, FileCode2, History, Settings, LogOut, Menu, X, 
  Cpu, Activity, CheckCircle2, Star, Plus, Upload, Code, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { stats, recentReviews, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(logout()); 
      navigate('/login');
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-black items-center justify-center">
        <Loader2 className="w-12 h-12 text-sakura-pink animate-spin" />
      </div>
    );
  }

  // --- DYNAMIC RECHARTS DATA ---
  const avgScore = stats?.averageScore || 0;
  const gaugeData = [
    { name: 'Score', value: avgScore },
    { name: 'Remaining', value: 100 - avgScore }
  ];
  const gaugeColors = ['#F9A8D4', '#27272a'];
  const sparkData = [{v: 10}, {v: 25}, {v: 15}, {v: 40}, {v: 35}, {v: 50}];

  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-sakura-pink/30 selection:text-white">
      
      {/* ========================================== */}
      {/* SIDEBAR                                    */}
      {/* ========================================== */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-950/80 backdrop-blur-xl border-r border-white/10 
        transform transition-transform duration-300 ease-in-out flex flex-col shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10 shrink-0">
          <div className="bg-white/5 rounded-xl p-1.5 shadow-[0_0_15px_rgba(244,114,182,0.15)] border border-sakura-pink/20">
            <Cpu className="w-6 h-6 text-sakura-pink" />
          </div>
          <h1 className="text-xl font-bold text-neutral-50 drop-shadow-[0_0_10px_rgba(249,168,212,0.35)]">LUMUS</h1>
          <button className="ml-auto md:hidden text-neutral-400" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sakura-pink/10 text-sakura-pink border border-sakura-pink/20 shadow-[0_0_15px_rgba(244,114,182,0.05)] transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/new-review" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-sakura-pink hover:bg-white/5 hover:shadow-[0_0_20px_rgba(244,114,182,0.1)] transition-all">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Review</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-sakura-pink hover:bg-white/5 hover:shadow-[0_0_20px_rgba(244,114,182,0.1)] transition-all">
            <History className="w-5 h-5" />
            <span className="font-medium">History</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-sakura-pink hover:bg-white/5 hover:shadow-[0_0_20px_rgba(244,114,182,0.1)] transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sakura-strong to-sakura-blush flex items-center justify-center text-black font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-neutral-200 truncate">{user?.name || 'Developer'}</p>
              <p className="text-xs text-neutral-500 truncate">{user?.email || 'System Online'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent rounded-xl transition-all">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* MAIN CONTENT AREA                          */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-[#0a0a0a] overflow-hidden">
        
        {/* Navbar */}
        <header className="h-20 shrink-0 flex items-center px-6 md:px-8 border-b border-white/5 bg-black/50 backdrop-blur-md z-40">
          <button className="mr-4 md:hidden text-neutral-400 hover:text-sakura-pink transition-colors" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium text-neutral-200">Overview</h2>
        </header>

        {/* 100% Height Dashboard Body (No Global Scroll) */}
        <div className="flex-1 flex flex-col p-6 md:p-8 gap-6 overflow-hidden">
          
          {/* 1. Hero Section + Quick Actions (Combined to save space) */}
          <section className="shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-fadeInUp">
            <div>
              <p className="text-sakura-pink text-xs font-semibold tracking-widest uppercase mb-2">Phase 1 • Overview</p>
              <h1 className="text-3xl font-bold text-neutral-50 drop-shadow-[0_0_12px_rgba(249,168,212,0.15)]">
                Welcome back, <span className="text-sakura-pink">{user?.name?.split(' ')[0] || 'Developer'}</span>
              </h1>
              <p className="text-neutral-400 mt-2 text-sm max-w-xl">
                Elevate your code quality. Live insights from your AI-powered reviews. Track scores, spot bugs, and keep your code optimized.
              </p>
            </div>
            
            {/* Quick Actions (Pill styled like 2nd SS) */}
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/new-review" className="bg-sakura-pink text-black px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:scale-105 transition-all text-sm">
                <Plus className="w-4 h-4" /> New Review
              </Link>
              <Link to="/paste-code" className="bg-transparent border border-white/20 text-neutral-200 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:border-sakura-pink/50 hover:text-sakura-pink hover:shadow-[0_0_15px_rgba(244,114,182,0.15)] transition-all text-sm">
                <Code className="w-4 h-4" /> Paste Code
              </Link>
              <Link to="/upload" className="bg-transparent border border-white/20 text-neutral-200 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:border-sakura-pink/50 hover:text-sakura-pink hover:shadow-[0_0_15px_rgba(244,114,182,0.15)] transition-all text-sm hidden sm:flex">
                <Upload className="w-4 h-4" /> Upload Files
              </Link>
            </div>
          </section>

          {/* 2. Statistics Cards */}
          <section className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {/* Total Reviews */}
            <div className="group bg-[#121214] border border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-sakura-pink/40 hover:shadow-[0_0_35px_rgba(244,114,182,0.25)] flex flex-col justify-between h-28">
              <div className="flex justify-between items-start z-10 relative">
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Total Reviews</p>
                <Activity className="w-4 h-4 text-sakura-pink/70" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-50 z-10 relative">{stats?.totalReviews || 0}</h3>
              <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}><Line type="monotone" dataKey="v" stroke="#F9A8D4" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Completed */}
            <div className="group bg-[#121214] border border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(52,211,153,0.20)] flex flex-col justify-between h-28">
              <div className="flex justify-between items-start z-10 relative">
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Completed</p>
                <CheckCircle2 className="w-4 h-4 text-emerald-400/70" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-50 z-10 relative">{stats?.statusBreakdown?.COMPLETED || 0}</h3>
              <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}><Line type="monotone" dataKey="v" stroke="#34D399" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Files Reviewed */}
            <div className="group bg-[#121214] border border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-sakura-blush/50 hover:shadow-[0_0_35px_rgba(251,207,232,0.25)] flex flex-col justify-between h-28">
              <div className="flex justify-between items-start z-10 relative">
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Files Reviewed</p>
                <FileCode2 className="w-4 h-4 text-sakura-blush/70" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-50 z-10 relative">{stats?.filesReviewed || 0}</h3>
            </div>

            {/* Failed Tests / Issues */}
            <div className="group bg-[#121214] border border-white/5 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-rose-500/40 hover:shadow-[0_0_35px_rgba(244,63,94,0.20)] flex flex-col justify-between h-28">
              <div className="flex justify-between items-start z-10 relative">
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Issues Found</p>
                <AlertCircle className="w-4 h-4 text-rose-500/70" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-50 z-10 relative">{stats?.statusBreakdown?.FAILED || 0}</h3>
            </div>
          </section>

          {/* 3. Bottom Split: Recent Reviews (scrollable) & Analytics Graph (Fixed) */}
          <section className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            
            {/* Left: Recent Reviews List */}
            <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:border-sakura-pink/30 hover:shadow-[0_0_35px_rgba(244,114,182,0.15)]">
              <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#121214] z-10">
                <h3 className="text-md font-semibold text-neutral-50">Recent Reviews</h3>
                <Link to="/history" className="text-xs font-medium text-sakura-pink hover:text-sakura-strong transition-colors flex items-center">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              {/* Inner Scrollable Area for Reviews */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {recentReviews && recentReviews.length > 0 ? (
                  recentReviews.map((review) => (
                    <div key={review.id} className="group flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-sakura-pink/40 hover:shadow-[0_0_20px_rgba(244,114,182,0.20)] transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/5 p-2 rounded-lg text-neutral-400 group-hover:text-sakura-pink transition-colors">
                          <Code className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-200">{review.title}</h4>
                          <p className="text-xs text-neutral-500 mt-0.5">ID: {review.id.substring(0, 8)} • {new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <span className="text-sm font-bold text-neutral-300">{review.overallScore || '--'}/100</span>
                        </div>
                        <div>
                          {review.status === 'COMPLETED' && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Pass</span>
                          )}
                          {review.status === 'FAILED' && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">Fail</span>
                          )}
                          {(review.status === 'PENDING' || review.status === 'ANALYZING' || review.status === 'AI_REVIEW') && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">Wait</span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-sakura-pink transition-colors" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-neutral-500 text-sm border border-dashed border-white/10 rounded-xl m-2">
                    No reviews found. Submit your first piece of code to get started!
                  </div>
                )}
              </div>
            </div>

            {/* Right: Average Score Graph */}
            <div className="bg-gradient-to-b from-[#1a1619] to-[#121214] border border-sakura-pink/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] hover:border-sakura-pink/50 flex flex-col h-full">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-neutral-200">Average Score</h3>
                <span className="px-2 py-0.5 bg-sakura-pink/10 text-sakura-pink text-[10px] font-bold rounded uppercase tracking-wider border border-sakura-pink/20 animate-pulse">Live</span>
              </div>
              <p className="text-xs text-neutral-500 mb-4 shrink-0">Code quality gauge</p>

              {/* Dynamic Recharts Circular Gauge */}
              <div className="relative flex-1 w-full flex items-center justify-center min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  <span className="text-5xl font-bold text-neutral-50 drop-shadow-[0_0_10px_rgba(249,168,212,0.3)]">{avgScore}</span>
                  <span className="text-[10px] text-sakura-pink font-semibold tracking-widest uppercase mt-2">Avg Score</span>
                </div>
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}