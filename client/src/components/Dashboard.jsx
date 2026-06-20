import StressGauge from './StressGauge.jsx';
import CommitChart from './CommitChart.jsx';
import RiskMatrix from './RiskMatrix.jsx';
import Recommendations from './Recommendations.jsx';

export default function Dashboard({ data }) {
  const { repo, coding, stress, wellness } = data;

  return (
    <div className="mt-8 space-y-6">
      {/* Repo header */}
      <div className="glass rounded-xl p-5 animate-slide-up">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {repo.owner}/{repo.name}
            </h2>
            {repo.description && (
              <p className="text-slate-400 mt-1">{repo.description}</p>
            )}
            <div className="flex gap-4 mt-2 text-sm text-slate-500">
              {repo.language && <span>📝 {repo.language}</span>}
              <span>⭐ {repo.stars} stars</span>
              <span>📊 {coding.totalCommits} commits analyzed</span>
            </div>
          </div>
          <StressGauge level={stress.overall} />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Commits" value={coding.totalCommits} icon="📊" />
        <StatCard label="Span (Days)" value={coding.spanDays} icon="📅" />
        <StatCard label="Weekend %" value={`${coding.weekend.percent}%`} icon="🏖️" />
        <StatCard label="Late-Night %" value={`${coding.lateNight.percent}%`} icon="🌙" />
      </div>

      {/* Charts & Risk */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CommitChart timeline={coding.timeline} />
        <RiskMatrix risks={stress.risks} />
      </div>

      {/* PR Stats */}
      <div className="glass rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-3">Pull Requests</h3>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{coding.pullRequests.total}</p>
            <p className="text-sm text-slate-400">Total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-400">{coding.pullRequests.open}</p>
            <p className="text-sm text-slate-400">Open</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">{coding.pullRequests.merged}</p>
            <p className="text-sm text-slate-400">Merged</p>
          </div>
        </div>
      </div>

      {/* Commit Spikes */}
      {coding.spikes.length > 0 && (
        <div className="glass rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-3">Top Commit Spikes</h3>
          <div className="space-y-2">
            {coding.spikes.map(spike => (
              <div key={spike.date} className="flex items-center gap-3">
                <span className="text-sm text-slate-400 w-28">{spike.date}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${Math.min(100, (spike.count / coding.spikes[0].count) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-white w-8 text-right">{spike.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Gaps */}
      {coding.gaps.length > 0 && (
        <div className="glass rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-3">Work Gaps Detected</h3>
          <div className="space-y-2">
            {coding.gaps.map((gap, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-slate-400">{gap.from}</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">{gap.to}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  gap.days > 30 ? 'bg-red-500/20 text-red-400' :
                  gap.days > 14 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {gap.days} days
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <Recommendations wellness={wellness} />
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="glass rounded-xl p-4 text-center">
      <p className="text-2xl mb-1">{icon}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}
