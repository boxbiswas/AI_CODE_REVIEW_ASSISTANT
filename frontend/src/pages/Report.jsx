import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../https/axios';

// Reusable Components
import ScoreCard from '../components/Report/ScoreCard';
import SummaryPanel from '../components/Report/SummaryPanel';
import StrengthsWeaknesses from '../components/Report/StrengthsWeaknesses';
import FindingsTable from '../components/Report/FindingsTable';
import StaticAnalysisPanel from '../components/Report/StaticAnalysisPanel';
import ComplexityPanel from '../components/Report/ComplexityPanel';
import AISuggestionsPanel from '../components/Report/AISuggestionsPanel';

// Icons
import { Bug, FileCode2, Cpu, Sparkles, LayoutDashboard, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function Report() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get(`/reviews/${id}`);
        console.log("BACKEND REVIEW DATA:", res.data.review);
        setReportData(res.data.review);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load report");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'findings', label: 'Findings', icon: Bug },
    { id: 'static', label: 'Static Analysis', icon: FileCode2 },
    { id: 'complexity', label: 'Complexity', icon: Cpu },
    { id: 'ai', label: 'AI Suggestions', icon: Sparkles },
  ];

  const handleTabKey = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading Report">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-pink-500 dark:text-sakura-pink mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">Loading analysis report...</p>
        </div>
      </Layout>
    );
  }

  if (error || !reportData) {
    return (
      <Layout title="Report Error">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white/70 dark:bg-[#121214] border border-rose-200 dark:border-rose-500/20 p-8 rounded-3xl flex flex-col items-center text-center max-w-md w-full shadow-[0_4px_24px_rgba(244,63,94,0.08)] dark:shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Failed to Load Report</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">{error || "The requested review could not be found."}</p>
            <Link 
              to="/dashboard"
              className="px-6 py-2.5 bg-pink-50 dark:bg-white/5 hover:bg-pink-100 dark:hover:bg-white/10 border border-pink-200 dark:border-white/10 rounded-xl text-sm font-bold transition-colors w-full flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Extract dynamic data from the backend review model
  const { 
    overallScore, status, summary, 
    findings = [], 
    staticAnalysis, 
    complexityReport, 
    aireview,
    codeFiles = []
  } = reportData;

  const aiJson = aireview?.reviewJson || {};
  const strengths = aiJson.strengths || [];
  const weaknesses = aiJson.weaknesses || [];
  const aiSuggestions = aiJson.aiSuggestions || [];
  
  // Map static and complexity safely
  const staticData = staticAnalysis?.rawOutput || {};
  const complexityData = complexityReport || {};

  const metrics = {
    criticalIssues: findings.filter(f => f.severity === 'CRITICAL').length,
    maintainabilityIndex: Math.round(complexityData?.maintainability || 0),
    totalLOC: complexityData?.linesOfCode || 0,
    totalFindings: findings.length,
    filesReviewed: codeFiles.length
  };

  return (
    <Layout title={`Report: ${reportData.title || id}`}>
      <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        
        {/* Tabs Navigation */}
        <div 
          className="flex overflow-x-auto no-scrollbar gap-2 mb-6 border-b border-pink-200/30 dark:border-white/10 pb-4 shrink-0"
          role="tablist"
          aria-label="Report Sections"
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKey(e, tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50 dark:focus:ring-sakura-pink/50 ${
                  activeTab === tab.id 
                    ? 'bg-pink-500 dark:bg-sakura-pink text-white dark:text-[#121214] shadow-[0_4px_12px_rgba(236,72,153,0.25)] dark:shadow-[0_0_15px_rgba(244,114,182,0.4)]' 
                    : 'bg-white dark:bg-[#121214] border border-pink-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 shadow-[0_2px_10px_rgba(236,72,153,0.04)] dark:shadow-none hover:border-pink-300 dark:hover:border-sakura-pink/40 hover:text-pink-600 dark:hover:text-sakura-pink hover:bg-pink-50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar min-h-0 focus:outline-none" tabIndex="-1">
          
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" hidden={activeTab !== 'overview'} className="h-full">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-6 animate-fadeInUp">
                {/* Header Section (Score & Summary) */}
                <div className="flex flex-col xl:flex-row gap-6 shrink-0">
                  <div className="w-full xl:w-80 shrink-0 flex">
                    <ScoreCard score={overallScore || 0} />
                  </div>
                  <div className="flex-1 flex flex-col gap-6 min-w-0">
                    <SummaryPanel summary={summary} status={status} metrics={metrics} />
                  </div>
                </div>
                {/* Strengths & Weaknesses */}
                <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
              </div>
            )}
          </div>

          <div role="tabpanel" id="panel-findings" aria-labelledby="tab-findings" hidden={activeTab !== 'findings'} className="h-full">
            {activeTab === 'findings' && (
              <FindingsTable findings={findings} />
            )}
          </div>

          <div role="tabpanel" id="panel-static" aria-labelledby="tab-static" hidden={activeTab !== 'static'} className="h-full">
            {activeTab === 'static' && (
              <StaticAnalysisPanel data={staticData} />
            )}
          </div>

          <div role="tabpanel" id="panel-complexity" aria-labelledby="tab-complexity" hidden={activeTab !== 'complexity'} className="h-full">
            {activeTab === 'complexity' && (
              <ComplexityPanel data={complexityData} />
            )}
          </div>

          <div role="tabpanel" id="panel-ai" aria-labelledby="tab-ai" hidden={activeTab !== 'ai'} className="h-full">
            {activeTab === 'ai' && (
              <AISuggestionsPanel suggestions={aiSuggestions} />
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
