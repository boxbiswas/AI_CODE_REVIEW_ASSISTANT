import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { Cpu, Mail, Lock, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then((result) => {
            if (!result.error) {
                navigate('/dashboard');
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Brand Logo & Name */}
            <div className="flex flex-col items-center mb-8 animate-fadeInUp">
                <div className="bg-white/5 rounded-2xl p-4 animate-float shadow-[0_0_35px_rgba(244,114,182,0.15)] mb-4 border border-sakura-pink/20">
                    <Cpu className="w-10 h-10 text-sakura-pink" />
                </div>
                <h1 className="text-4xl font-bold text-neutral-50 drop-shadow-[0_0_14px_rgba(249,168,212,0.35)] tracking-tight">
                    LUMUS
                </h1>
                <p className="text-sakura-blush-muted mt-2 text-sm tracking-wide uppercase font-medium">
                    AI Code Review Assistant
                </p>
            </div>

            {/* Glassmorphism Login Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-sakura-pink/10 rounded-2xl p-8 shadow-[0_0_35px_rgba(244,114,182,0.10)] animate-fadeInUp">
                <h2 className="text-2xl font-semibold text-neutral-50 mb-6">Welcome back</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-medium uppercase tracking-wide text-neutral-400 pl-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-sakura-pink/40 focus:border-transparent transition-all"
                                placeholder="developer@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium uppercase tracking-wide text-neutral-400 pl-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-sakura-pink/40 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-sakura-blush hover:text-sakura-pink transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sakura-pink/90 hover:bg-sakura-pink text-black font-semibold rounded-xl py-3 shadow-[0_0_20px_rgba(244,114,182,0.2)] hover:shadow-[0_0_30px_rgba(244,114,182,0.4)] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400 border-t border-white/5 pt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-sakura-pink hover:text-sakura-strong font-medium transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}