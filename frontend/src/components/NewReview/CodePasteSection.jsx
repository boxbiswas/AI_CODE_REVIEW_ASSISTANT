import { Editor } from '@monaco-editor/react';
import { FileJson } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function CodePasteSection({
    code,
    setCode,
    selectedLang,
    setSelectedLang,
    isLangMenuOpen,
    setIsLangMenuOpen,
    theme,
    supportedLanguages
}) {
    return (
        <div className="flex flex-col flex-1 animate-fadeInUp min-h-0" role="tabpanel" aria-label="Paste Code Tab">
            <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 border-b-0 rounded-t-xl shrink-0">
                <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-pink-500 dark:text-sakura-pink" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">snippet{selectedLang.ext}</span>
                </div>

                <LanguageSelector
                    selectedLang={selectedLang}
                    setSelectedLang={setSelectedLang}
                    isLangMenuOpen={isLangMenuOpen}
                    setIsLangMenuOpen={setIsLangMenuOpen}
                    supportedLanguages={supportedLanguages}
                />
            </div>

            <div className="flex-1 border border-pink-200/40 dark:border-white/5 rounded-b-xl overflow-hidden bg-white dark:bg-[#1e1e1e] flex flex-col min-h-0">
                <div className="flex-1 relative">
                    <Editor
                        className="absolute inset-0"
                        height="100%"
                        language={selectedLang.id}
                        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: 'monospace',
                            padding: { top: 16, bottom: 16 },
                            scrollBeyondLastLine: false,
                            smoothScrolling: true,
                            wordWrap: 'on',
                            rulers: [],
                            overviewRulerLanes: 0,
                            hideCursorInOverviewRuler: true,
                            overviewRulerBorder: false
                        }}
                        aria-label="Code Editor"
                    />
                </div>
            </div>
        </div>
    );
}