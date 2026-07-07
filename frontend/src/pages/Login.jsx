import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { Loader2 } from 'lucide-react';

import AuthBrand from '../components/Auth/AuthBrand';
import AuthInput from '../components/Auth/AuthInput';

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-white dark:from-transparent dark:to-transparent">
            {/* Brand Logo & Name */}
            <AuthBrand />

            {/* Glassmorphism Login Card */}
            <div className="w-full max-w-md bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-pink-200/40 dark:border-sakura-pink/10 rounded-2xl p-8 shadow-[0_4px_24px_rgba(236,72,153,0.08)] dark:shadow-[0_0_35px_rgba(244,114,182,0.10)] animate-fadeInUp">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6">Welcome back</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <AuthInput
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="developer@example.com"
                    />

                    <AuthInput
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-pink-500 dark:text-sakura-blush hover:text-pink-600 dark:hover:text-sakura-pink transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 dark:bg-sakura-pink/90 hover:bg-pink-600 dark:hover:bg-sakura-pink text-white dark:text-black font-semibold rounded-xl py-3 shadow-[0_4px_20px_rgba(236,72,153,0.20)] dark:shadow-[0_0_20px_rgba(244,114,182,0.2)] hover:shadow-[0_4px_30px_rgba(236,72,153,0.30)] dark:hover:shadow-[0_0_30px_rgba(244,114,182,0.4)] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400 border-t border-pink-200/30 dark:border-white/5 pt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-pink-500 dark:text-sakura-pink hover:text-pink-600 dark:hover:text-sakura-strong font-medium transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}