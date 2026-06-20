export function analyzeStress(commits, coding) {
  const risks = [];

  // 1. Commit spikes
  const maxSpike = coding.spikes[0]?.count || 0;
  if (maxSpike >= 10) {
    risks.push({ dimension: 'Commit Spikes', level: 'High', detail: `${maxSpike} commits in a single day` });
  } else if (maxSpike >= 5) {
    risks.push({ dimension: 'Commit Spikes', level: 'Medium', detail: `${maxSpike} commits in a single day` });
  } else {
    risks.push({ dimension: 'Commit Spikes', level: 'Low', detail: 'No extreme spikes detected' });
  }

  // 2. Weekend coding
  if (coding.weekend.percent > 30) {
    risks.push({ dimension: 'Weekend Coding', level: 'High', detail: `${coding.weekend.percent}% of commits on weekends` });
  } else if (coding.weekend.percent > 15) {
    risks.push({ dimension: 'Weekend Coding', level: 'Medium', detail: `${coding.weekend.percent}% of commits on weekends` });
  } else {
    risks.push({ dimension: 'Weekend Coding', level: 'Low', detail: `${coding.weekend.percent}% weekend activity` });
  }

  // 3. Late-night activity
  if (coding.lateNight.percent > 50) {
    risks.push({ dimension: 'Late-Night Activity', level: 'High', detail: `${coding.lateNight.percent}% of commits are late night` });
  } else if (coding.lateNight.percent > 20) {
    risks.push({ dimension: 'Late-Night Activity', level: 'Medium', detail: `${coding.lateNight.percent}% of commits are late night` });
  } else {
    risks.push({ dimension: 'Late-Night Activity', level: 'Low', detail: `${coding.lateNight.percent}% late-night activity` });
  }

  // 4. Work gaps (deadline crunches)
  const longestGap = coding.gaps[0]?.days || 0;
  if (longestGap > 30) {
    risks.push({ dimension: 'Deadline Crunches', level: 'High', detail: `${longestGap}-day gap suggests deadline-driven bursts` });
  } else if (longestGap > 14) {
    risks.push({ dimension: 'Deadline Crunches', level: 'Medium', detail: `${longestGap}-day gap between activity` });
  } else {
    risks.push({ dimension: 'Deadline Crunches', level: 'Low', detail: 'Consistent activity pattern' });
  }

  // 5. Commit frequency irregularity
  if (coding.avgCommitsPerDay > 5) {
    risks.push({ dimension: 'Commit Volume', level: 'High', detail: `${coding.avgCommitsPerDay} commits/day average — excessive volume` });
  } else if (coding.avgCommitsPerDay > 2) {
    risks.push({ dimension: 'Commit Volume', level: 'Medium', detail: `${coding.avgCommitsPerDay} commits/day average` });
  } else {
    risks.push({ dimension: 'Commit Volume', level: 'Low', detail: `${coding.avgCommitsPerDay} commits/day — moderate pace` });
  }

  // 6. Recovery periods
  const hasRecovery = coding.gaps.some(g => g.days >= 7 && g.days <= 14);
  if (hasRecovery) {
    risks.push({ dimension: 'Recovery Periods', level: 'Low', detail: 'Healthy breaks detected between work sessions' });
  } else if (longestGap > 30) {
    risks.push({ dimension: 'Recovery Periods', level: 'High', detail: 'No balanced recovery — extreme gaps or no breaks' });
  } else {
    risks.push({ dimension: 'Recovery Periods', level: 'Medium', detail: 'Recovery pattern could be improved' });
  }

  // Overall stress level
  const highCount = risks.filter(r => r.level === 'High').length;
  const medCount = risks.filter(r => r.level === 'Medium').length;

  let overall;
  if (highCount >= 3) overall = 'High';
  else if (highCount >= 1 || medCount >= 3) overall = 'Medium';
  else overall = 'Low';

  return { overall, risks };
}
