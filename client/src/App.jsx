import { useState } from 'react';
import RepoSearch from './components/RepoSearch.jsx';
import Dashboard from './components/Dashboard.jsx';
import React from 'react';
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze(owner, repo) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/analysis/${owner}/${repo}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Analysis failed');
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h1 className="text-xl font-bold text-white">Student Coding Stress Tracker</h1>
            <p className="text-sm text-slate-400">Analyze GitHub activity for workload imbalance</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <RepoSearch onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-6 glass rounded-xl p-4 border-red-500/30 bg-red-500/10">
            <p className="text-red-400">⚠ {error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-400">Analyzing repository activity...</p>
          </div>
        )}

        {data && <Dashboard data={data} />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-500 text-sm">
        Student Coding Stress Tracker &copy; 2026
      </footer>
    </div>
  );
}
