export function generateRecommendations(coding, stress) {
  const tips = [];

  // Based on stress risks
  stress.risks.forEach(risk => {
    switch (risk.dimension) {
      case 'Commit Spikes':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Workload',
            priority: risk.level,
            title: 'Spread out your commits',
            detail: 'Instead of batching many commits in one day, aim for smaller, consistent daily contributions. This reduces cognitive load and improves code quality.',
          });
        }
        break;

      case 'Weekend Coding':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Work-Life Balance',
            priority: risk.level,
            title: 'Protect your weekends',
            detail: 'Weekend coding erodes rest time. Set a boundary: no commits on Saturday/Sunday unless truly urgent. Rest improves weekday productivity.',
          });
        }
        break;

      case 'Late-Night Activity':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Health',
            priority: risk.level,
            title: 'Avoid late-night coding sessions',
            detail: 'Coding past 10 PM disrupts sleep quality. Shift work to afternoon hours when possible. If you must work late, take a screen break before bed.',
          });
        }
        break;

      case 'Deadline Crunches':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Planning',
            priority: risk.level,
            title: 'Break work into smaller milestones',
            detail: 'Long gaps followed by bursts suggest deadline pressure. Break projects into weekly milestones with specific deliverables to avoid last-minute rushes.',
          });
        }
        break;

      case 'Commit Volume':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Sustainability',
            priority: risk.level,
            title: 'Reduce commit volume',
            detail: 'High commit counts may indicate rushed development. Focus on fewer, well-tested commits. Quality over quantity.',
          });
        }
        break;

      case 'Recovery Periods':
        if (risk.level !== 'Low') {
          tips.push({
            category: 'Wellness',
            priority: risk.level,
            title: 'Schedule regular breaks',
            detail: 'After intense coding sessions, take 1-2 days off. Use the Pomodoro technique: 25 min work, 5 min break. Longer breaks every 2 hours.',
          });
        }
        break;
    }
  });

  // Positive reinforcement
  if (stress.overall === 'Low') {
    tips.push({
      category: 'Positive',
      priority: 'Low',
      title: 'Great work habits!',
      detail: 'Your coding patterns show healthy consistency. Keep up the balanced approach to development.',
    });
  }

  // General tips
  tips.push({
    category: 'General',
    priority: 'Info',
    title: 'Use meaningful commit messages',
    detail: 'Clear commit messages (feat:, fix:, docs:) help you and your team understand project history and reduce context-reload time.',
  });

  return {
    overallHealth: stress.overall === 'Low' ? 'Healthy' : stress.overall === 'Medium' ? 'Needs Attention' : 'At Risk',
    tips: tips.sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2, Info: 3 };
      return (order[a.priority] || 99) - (order[b.priority] || 99);
    }),
  };
}
