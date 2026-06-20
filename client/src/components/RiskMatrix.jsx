export default function RiskMatrix({ risks }) {
  const levelStyle = {
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const levelEmoji = { Low: '✅', Medium: '⚠️', High: '🔴' };

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>

      <div className="space-y-3">
        {risks.map((risk, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-800/40 rounded-lg p-3 border border-slate-700/50"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{risk.dimension}</p>
              <p className="text-xs text-slate-400 mt-0.5">{risk.detail}</p>
            </div>
            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${levelStyle[risk.level]}`}>
              {levelEmoji[risk.level]} {risk.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
