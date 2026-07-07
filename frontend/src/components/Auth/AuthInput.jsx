import { Mail, Lock } from 'lucide-react';

const iconMap = {
    email: Mail,
    password: Lock,
};

export default function AuthInput({ type, value, onChange, placeholder, label }) {
    const Icon = iconMap[type] || Mail;

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 pl-1">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                <input
                    type={type}
                    required
                    value={value}
                    onChange={onChange}
                    className="w-full bg-white dark:bg-black/50 border border-pink-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-pink-400/50 dark:focus:ring-sakura-pink/40 focus:border-transparent transition-all"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}