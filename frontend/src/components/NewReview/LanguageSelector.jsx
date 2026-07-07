import { ChevronDown } from 'lucide-react';

export default function LanguageSelector({
    selectedLang,
    setSelectedLang,
    isLangMenuOpen,
    setIsLangMenuOpen,
    supportedLanguages
}) {
    return (
        <div className="relative">
            <button
                aria-haspopup="listbox"
                aria-expanded={isLangMenuOpen}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-600 dark:text-neutral-300 bg-pink-50 dark:bg-white/5 hover:bg-pink-100 dark:hover:bg-white/10 px-3 py-1.5 rounded transition-colors border border-pink-200/40 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-pink-400 dark:focus:ring-sakura-pink"
            >
                {selectedLang.name} <ChevronDown className="w-3 h-3" />
            </button>

            {isLangMenuOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)} aria-hidden="true" />
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-pink-200/40 dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl z-20 py-1 overflow-hidden" role="listbox">
                        {supportedLanguages.map((lang) => (
                            <button
                                key={lang.id}
                                role="option"
                                aria-selected={selectedLang.id === lang.id}
                                onClick={() => {
                                    setSelectedLang(lang);
                                    setIsLangMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors focus:outline-none focus:bg-pink-50 dark:focus:bg-sakura-pink/20 ${selectedLang.id === lang.id ? 'bg-pink-50 dark:bg-sakura-pink/10 text-pink-600 dark:text-sakura-pink' : 'text-neutral-700 dark:text-neutral-300 hover:bg-pink-50/50 dark:hover:bg-white/5'
                                    }`}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}