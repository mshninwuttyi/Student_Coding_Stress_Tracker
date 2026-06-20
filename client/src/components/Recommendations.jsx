export default function Recommendations({ wellness }) {
  const priorityStyle = {
    High: 'border-l-red-500 bg-red-500/5',
    Medium: 'border-l-yellow-500 bg-yellow-500/5',
    Low: 'border-l-green-500 bg-green-500/5',
    Info: 'border-l-blue-500 bg-blue-500/5',
  };

  const categoryEmoji = {
    'Workload': '📊',
    'Work-Life Balance': '⚖️',
    'Health': '💤',
    'Planning': '📋',
    'Sustainability': '♻️',
    'Wellness': '🧘',
    'Positive': '🌟',
    'General': '💡',
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recommendations</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          wellness.overallHealth === 'Healthy' ? 'bg-green-500/20 text-green-400' :
          wellness.overallHealth === 'Needs Attention' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {wellness.overallHealth}
        </span>
      </div>

      <div className="space-y-3">
        {wellness.tips.map((tip, i) => (
          <div
            key={i}
            className={`border-l-4 rounded-r-lg p-4 ${priorityStyle[tip.priority] || priorityStyle.Info}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{categoryEmoji[tip.category] || '💡'}</span>
              <p className="font-semibold text-white text-sm">{tip.title}</p>
              <span className="ml-auto text-xs text-slate-500">{tip.category}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{tip.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
