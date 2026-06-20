export default function StressGauge({ level }) {
  const config = {
    Low: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', emoji: '✅', label: 'Low Stress', glow: 'glow-low' },
    Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', emoji: '⚠️', label: 'Medium Stress', glow: 'glow-medium' },
    High: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', emoji: '🔴', label: 'High Stress', glow: 'glow-high' },
  };

  const c = config[level] || config.Medium;

  return (
    <div className={`${c.bg} ${c.border} ${c.glow} border rounded-2xl p-6 text-center min-w-[180px]`}>
      <p className="text-4xl mb-2">{c.emoji}</p>
      <p className={`text-xl font-bold ${c.color}`}>{c.label}</p>
      <p className="text-sm text-slate-400 mt-1">Overall Risk Level</p>
    </div>
  );
}
