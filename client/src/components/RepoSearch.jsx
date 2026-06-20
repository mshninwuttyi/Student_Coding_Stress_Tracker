import { useState } from 'react';

export default function RepoSearch({ onAnalyze, loading }) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!owner.trim() || !repo.trim()) return;
    onAnalyze(owner.trim(), repo.trim());
  }

  // Quick-fill examples
  const examples = [
    { owner: 'mshninwuttyi', repo: 'EventTicketingSystem' },
    { owner: 'mshninwuttyi', repo: 'Student_Coding_Stress_Tracker' },
    { owner: 'mshninwuttyi', repo: 'hr_system' },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            placeholder="Owner (e.g. mshninwuttyi)"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            className="flex-1 bg-slate-800/60 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
          <span className="flex items-center text-slate-500 text-xl">/</span>
          <input
            type="text"
            placeholder="Repository (e.g. EventTicketingSystem)"
            value={repo}
            onChange={e => setRepo(e.target.value)}
            className="flex-1 bg-slate-800/60 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !owner.trim() || !repo.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {/* Quick-fill */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-slate-500 text-sm">Quick fill:</span>
        {examples.map(ex => (
          <button
            key={`${ex.owner}/${ex.repo}`}
            onClick={() => { setOwner(ex.owner); setRepo(ex.repo); }}
            className="text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition"
          >
            {ex.owner}/{ex.repo}
          </button>
        ))}
      </div>
    </div>
  );
}
