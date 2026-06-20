export default function CommitChart({ timeline }) {
  const entries = Object.entries(timeline).sort((a, b) => a[0].localeCompare(b[0]));
  const maxCount = Math.max(...entries.map(([, c]) => c), 1);

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Commit Timeline (by Week)</h3>

      {entries.length === 0 ? (
        <p className="text-slate-500 text-sm">No timeline data available</p>
      ) : (
        <div className="space-y-2">
          {entries.map(([week, count]) => (
            <div key={week} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-20 shrink-0">{week}</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(4, (count / maxCount) * 100)}%` }}
                >
                  <span className="text-xs font-mono text-white font-semibold">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
