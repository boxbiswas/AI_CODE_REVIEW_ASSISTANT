import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logoutUser, logout } from '../redux/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, History, LogOut, Menu, X, 
  Cpu, Plus, Sun, Moon
} from 'lucide-react';

export default function Layout({ children, title = 'Overview' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(logout()); 
      navigate('/login');
    });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Review', path: '/new-review', icon: Plus },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-black overflow-hidden selection:bg-sakura-pink/30 selection:text-white">
      
      {/* ========================================== */}
      {/* SIDEBAR                                    */}
      {/* ========================================== */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 
        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-pink-100 dark:border-white/10 
        transform transition-transform duration-300 ease-in-out flex flex-col shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-pink-100 dark:border-white/10 shrink-0">
          <div className="bg-pink-50 dark:bg-white/5 rounded-xl p-1.5 shadow-[0_2px_12px_rgba(236,72,153,0.08)] dark:shadow-[0_0_15px_rgba(244,114,182,0.15)] border border-pink-200/40 dark:border-sakura-pink/20">
            <Cpu className="w-6 h-6 text-sakura-strong dark:text-sakura-pink" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_10px_rgba(249,168,212,0.35)]">LUMUS</h1>
          <button className="ml-auto md:hidden text-neutral-400" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-pink-100 text-pink-600 border border-pink-200 shadow-[0_2px_12px_rgba(236,72,153,0.06)] dark:bg-sakura-pink/10 dark:text-sakura-pink dark:border-sakura-pink/20 dark:shadow-[0_0_15px_rgba(244,114,182,0.05)]' 
                    : 'text-neutral-500 hover:text-pink-600 hover:bg-pink-50 dark:text-neutral-400 dark:hover:text-sakura-pink dark:hover:bg-white/5 dark:hover:shadow-[0_0_20px_rgba(244,114,182,0.1)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <div className="pt-4 mt-4 border-t border-pink-100 dark:border-white/10">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:text-sakura-pink dark:hover:bg-white/5 transition-all"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {/* Toggle Track */}
              <div className="relative w-12 h-6 bg-pink-100 dark:bg-white/10 rounded-full p-0.5 transition-colors border border-pink-200/40 dark:border-white/10">
                {/* Thumb */}
                <div className={`w-5 h-5 rounded-full bg-white dark:bg-sakura-pink shadow-md transition-transform duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}>
                  {theme === 'dark' ? (
                    <Moon className="w-3 h-3 text-black" />
                  ) : (
                    <Sun className="w-3 h-3 text-pink-500" />
                  )}
                </div>
              </div>
              <span className="font-medium text-sm">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-pink-100 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-pink-50/50 dark:bg-white/5 rounded-xl border border-pink-200/30 dark:border-white/10 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sakura-strong to-sakura-blush flex items-center justify-center text-white dark:text-black font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{user?.name || 'Developer'}</p>
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
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-white/50 dark:bg-[#0a0a0a] overflow-hidden">
        
        {/* Navbar */}
        <header className="h-20 shrink-0 flex items-center px-6 md:px-8 border-b border-pink-100 dark:border-white/5 bg-white/80 dark:bg-black/50 backdrop-blur-md z-40">
          <button className="mr-4 md:hidden text-neutral-400 hover:text-sakura-pink transition-colors" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{title}</h2>
        </header>

        {/* Dynamic Content */}
        {children}

      </main>
    </div>
  );
}
