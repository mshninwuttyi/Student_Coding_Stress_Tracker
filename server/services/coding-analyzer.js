export function analyzeCodingPatterns(commits, pullRequests) {
  if (!commits.length) {
    return { error: 'No commits found', totalCommits: 0 };
  }

  const dates = commits.map(c => new Date(c.date));
  const hours = dates.map(d => d.getUTCHours());
  const daysOfWeek = dates.map(d => d.getUTCDay());

  // Commit frequency
  const sortedDates = [...dates].sort((a, b) => a - b);
  const firstDate = sortedDates[0];
  const lastDate = sortedDates[sortedDates.length - 1];
  const spanDays = Math.max(1, Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)));
  const avgCommitsPerDay = (commits.length / spanDays).toFixed(2);

  // Commit spikes — find days with most commits
  const commitsByDate = {};
  commits.forEach(c => {
    const dateKey = c.date.split('T')[0];
    commitsByDate[dateKey] = (commitsByDate[dateKey] || 0) + 1;
  });
  const spikes = Object.entries(commitsByDate)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([date, count]) => ({ date, count }));

  // Weekend coding (0 = Sunday, 6 = Saturday)
  const weekendCommits = daysOfWeek.filter(d => d === 0 || d === 6).length;
  const weekendPercent = ((weekendCommits / commits.length) * 100).toFixed(1);

  // Late-night activity (10PM - 6AM UTC)
  const lateNightCommits = hours.filter(h => h >= 22 || h < 6).length;
  const lateNightPercent = ((lateNightCommits / commits.length) * 100).toFixed(1);

  // Commit timeline (group by week)
  const timeline = {};
  commits.forEach(c => {
    const d = new Date(c.date);
    const weekStart = new Date(d);
    weekStart.setUTCDate(weekStart.getUTCDate() - weekStart.getUTCDay());
    const key = weekStart.toISOString().split('T')[0];
    timeline[key] = (timeline[key] || 0) + 1;
  });

  // PR workload
  const openPRs = pullRequests.filter(pr => pr.state === 'open').length;
  const mergedPRs = pullRequests.filter(pr => pr.mergedAt).length;

  // Gaps — find longest periods with no commits
  const gaps = [];
  for (let i = 1; i < sortedDates.length; i++) {
    const diffDays = Math.ceil((sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      gaps.push({
        from: sortedDates[i - 1].toISOString().split('T')[0],
        to: sortedDates[i].toISOString().split('T')[0],
        days: diffDays,
      });
    }
  }

  return {
    totalCommits: commits.length,
    spanDays,
    avgCommitsPerDay: parseFloat(avgCommitsPerDay),
    spikes,
    weekend: { commits: weekendCommits, percent: parseFloat(weekendPercent) },
    lateNight: { commits: lateNightCommits, percent: parseFloat(lateNightPercent) },
    timeline,
    pullRequests: { total: pullRequests.length, open: openPRs, merged: mergedPRs },
    gaps: gaps.sort((a, b) => b.days - a.days).slice(0, 3),
  };
}
