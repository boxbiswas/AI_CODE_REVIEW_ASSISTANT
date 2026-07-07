import { FileCode2, Upload, CheckCircle, X } from 'lucide-react';

export default function UploadSection({
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile
}) {
    return (
        <div className="flex flex-col md:flex-row gap-6 h-full flex-1 min-h-0 animate-fadeInUp" role="tabpanel" aria-label="Upload Files Tab">
            <div className="w-full md:w-1/2 flex flex-col min-h-0">
                <div
                    {...getRootProps()}
                    className={`
            border-2 border-dashed rounded-2xl flex-1 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[200px]
            ${isDragActive
                            ? 'border-pink-400 dark:border-sakura-pink bg-pink-50 dark:bg-sakura-pink/5 shadow-[0_4px_20px_rgba(236,72,153,0.10)] dark:shadow-[0_0_30px_rgba(244,114,182,0.15)]'
                            : 'border-pink-200/60 dark:border-white/10 hover:border-pink-300 dark:hover:border-sakura-pink/50 hover:bg-pink-50/50 dark:hover:bg-white/5 bg-white dark:bg-[#121214]'}
          `}
                    aria-label="File Upload Dropzone"
                >
                    <input {...getInputProps()} aria-label="File Input" />
                    <div className="w-12 h-12 rounded-full bg-pink-50 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className={`w-6 h-6 ${isDragActive ? 'text-pink-500 dark:text-sakura-pink' : 'text-neutral-400'}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-1 px-4">
                        {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
                    </h3>
                    <p className="text-xs text-neutral-500 mb-2 px-4">or click to browse from your computer</p>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-4">Supported formats: .js, .ts, .py, .java, etc.</p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col flex-1 min-h-[200px] border border-pink-200/40 dark:border-white/5 rounded-2xl bg-white dark:bg-[#121214] overflow-hidden">
                <div className="p-4 border-b border-pink-200/30 dark:border-white/5 bg-pink-50/30 dark:bg-black/40 shrink-0">
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                        Ready for analysis ({files.length})
                    </h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 dark:text-neutral-500 text-sm opacity-50">
                            <FileCode2 className="w-8 h-8 mb-2" />
                            <p>No files uploaded yet.</p>
                        </div>
                    ) : (
                        files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-pink-200/30 dark:border-white/5 bg-pink-50/30 dark:bg-black/40 group transition-colors hover:border-pink-300 dark:hover:border-white/20">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <FileCode2 className="w-5 h-5 text-pink-500 dark:text-sakura-pink shrink-0" aria-hidden="true" />
                                    <div className="truncate text-left">
                                        <p className="text-sm text-neutral-800 dark:text-neutral-200 truncate">{file.name}</p>
                                        <p className="text-xs text-neutral-500">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => removeFile(e, idx)}
                                    className="text-neutral-400 dark:text-neutral-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1 rounded focus:outline-none focus:ring-1 focus:ring-rose-400"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}