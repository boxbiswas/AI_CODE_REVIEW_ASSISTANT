import { useState, useCallback, useEffect } from 'react';
import Layout from '../components/Layout';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../https/axios';
import { Code, Upload, Play } from 'lucide-react';

import AnalysisModal from '../components/NewReview/AnalysisModal';
import CodePasteSection from '../components/NewReview/CodePasteSection';
import UploadSection from '../components/NewReview/UploadSection';
import LanguageSelector from '../components/NewReview/LanguageSelector';

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', ext: '.js' },
  { id: 'typescript', name: 'TypeScript', ext: '.ts' },
  { id: 'python', name: 'Python', ext: '.py' },
  { id: 'java', name: 'Java', ext: '.java' },
  { id: 'cpp', name: 'C++', ext: '.cpp' },
  { id: 'csharp', name: 'C#', ext: '.cs' },
  { id: 'go', name: 'Go', ext: '.go' },
  { id: 'rust', name: 'Rust', ext: '.rs' },
  { id: 'php', name: 'PHP', ext: '.php' },
];

const DEFAULT_CODE = '// Paste your code here\n';

export default function NewReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'paste');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [files, setFiles] = useState([]);
  const [selectedLang, setSelectedLang] = useState(SUPPORTED_LANGUAGES[0]);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Pipeline State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [pipelineStatus, setPipelineStatus] = useState(null);
  const [pipelineError, setPipelineError] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'upload') {
      setCode(DEFAULT_CODE);
      setSelectedLang(SUPPORTED_LANGUAGES[0]);
    } else {
      setFiles([]);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (e, index) => {
    e.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setPipelineError(null);
      setPipelineStatus('UPLOADING');

      const formData = new FormData();
      formData.append('title', 'Review ' + new Date().toLocaleString());

      if (activeTab === 'paste') {
        formData.append('submissionType', 'PASTED_CODE');
        formData.append('language', selectedLang.id);
        formData.append('pastedCode', code);
      } else {
        formData.append('submissionType', 'FILE_UPLOAD');
        files.forEach(file => formData.append('files', file));
      }

      const res = await api.post('/submissions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setReviewId(res.data.review.id);
      setPipelineStatus(res.data.review.status || 'PENDING');

    } catch (err) {
      console.error(err);
      setPipelineError(err.response?.data?.message || err.message || 'Submission failed');
    }
  };

  // Poll Status
  useEffect(() => {
    if (!reviewId) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/reviews/${reviewId}`);
        const currentStatus = res.data.review.status;

        setPipelineStatus(currentStatus);

        if (currentStatus === 'COMPLETED') {
          clearInterval(interval);
          navigate(`/report/${reviewId}`);
        } else if (currentStatus === 'FAILED') {
          clearInterval(interval);
          setPipelineError("Analysis failed during processing. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setPipelineError(err.response?.data?.message || "Failed to check status");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reviewId, navigate]);

  const getProgressMessage = () => {
    switch (pipelineStatus) {
      case 'UPLOADING': return "Uploading Files...";
      case 'PENDING': return "Initializing Analysis Pipeline...";
      case 'ANALYZING': return "Running Static & Complexity Analysis...";
      case 'AI_REVIEW': return "Generating AI Review...";
      case 'COMPLETED': return "Preparing Report...";
      case 'FAILED': return "Analysis Failed";
      default: return "Processing...";
    }
  };

  const isSubmitDisabled = isAnalyzing ||
    (activeTab === 'upload' && files.length === 0) ||
    (activeTab === 'paste' && (code.trim() === DEFAULT_CODE.trim() || code.trim() === ''));

  const handleTabKey = (e, tabName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(tabName);
    }
  };

  return (
    <Layout title="New Review">
      <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8 flex flex-col items-center min-h-0 relative">

        <AnalysisModal
          isAnalyzing={isAnalyzing}
          pipelineError={pipelineError}
          pipelineStatus={pipelineStatus}
          getProgressMessage={getProgressMessage}
          onClose={() => {
            setIsAnalyzing(false);
            setReviewId(null);
            setPipelineError(null);
            setPipelineStatus(null);
          }}
        />

        <div className="w-full max-w-5xl h-full flex flex-col animate-fadeInUp min-h-0">

          <div className="mb-6 text-center shrink-0">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 dark:drop-shadow-[0_0_12px_rgba(249,168,212,0.15)] mb-2">
              Create New Review
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-sm">
              Submit your code for an AI-powered analysis. Choose between pasting snippets directly or uploading full files.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-[#121214] border border-pink-200/40 dark:border-white/5 rounded-3xl overflow-hidden shadow-[0_4px_40px_rgba(236,72,153,0.06)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col flex-1 min-h-0">

            {/* Tabs */}
            <div className="flex p-2 bg-pink-50/50 dark:bg-black/40 border-b border-pink-200/30 dark:border-white/5 shrink-0" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'paste'}
                onClick={() => handleTabChange('paste')}
                onKeyDown={(e) => handleTabKey(e, 'paste')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50 dark:focus:ring-sakura-pink/50 ${activeTab === 'paste'
                  ? 'bg-pink-500 dark:bg-sakura-pink text-white dark:text-black shadow-[0_4px_12px_rgba(236,72,153,0.25)] dark:shadow-[0_0_15px_rgba(244,114,182,0.3)]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-pink-100 dark:hover:bg-white/5 hover:text-pink-600 dark:hover:text-neutral-200'
                  }`}
              >
                <Code className="w-4 h-4" aria-hidden="true" /> Paste Code
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'upload'}
                onClick={() => handleTabChange('upload')}
                onKeyDown={(e) => handleTabKey(e, 'upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50 dark:focus:ring-sakura-pink/50 ${activeTab === 'upload'
                  ? 'bg-pink-500 dark:bg-sakura-pink text-white dark:text-black shadow-[0_4px_12px_rgba(236,72,153,0.25)] dark:shadow-[0_0_15px_rgba(244,114,182,0.3)]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-pink-100 dark:hover:bg-white/5 hover:text-pink-600 dark:hover:text-neutral-200'
                  }`}
              >
                <Upload className="w-4 h-4" aria-hidden="true" /> Upload Files
              </button>
            </div>

            <div className="flex-1 p-4 md:p-6 flex flex-col min-h-0 bg-neutral-50 dark:bg-[#0a0a0a]">

              {activeTab === 'paste' && (
                <CodePasteSection
                  code={code}
                  setCode={setCode}
                  selectedLang={selectedLang}
                  setSelectedLang={setSelectedLang}
                  isLangMenuOpen={isLangMenuOpen}
                  setIsLangMenuOpen={setIsLangMenuOpen}
                  theme={theme}
                  supportedLanguages={SUPPORTED_LANGUAGES}
                />
              )}

              {activeTab === 'upload' && (
                <UploadSection
                  files={files}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                  removeFile={removeFile}
                />
              )}

            </div>

            <div className="p-4 md:p-6 border-t border-pink-200/30 dark:border-white/5 bg-white/70 dark:bg-[#121214] flex justify-end shrink-0">
              <button
                onClick={handleAnalyze}
                disabled={isSubmitDisabled}
                className="bg-gradient-to-r from-pink-600 dark:from-sakura-strong to-pink-500 dark:to-sakura-pink text-white dark:text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_4px_20px_rgba(236,72,153,0.30)] dark:hover:shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121214] focus:ring-pink-400 dark:focus:ring-sakura-pink"
              >
                <Play className="w-5 h-5" aria-hidden="true" /> Analyze Code
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}