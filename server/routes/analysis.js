import { Router } from 'express';
import { fetchRepoInfo, fetchCommits, fetchPullRequests } from '../services/github.js';
import { analyzeCodingPatterns } from '../services/coding-analyzer.js';
import { analyzeStress } from '../services/stress-analyzer.js';
import { generateRecommendations } from '../services/wellness.js';

const router = Router();

router.get('/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const [repoInfo, commits, pullRequests] = await Promise.all([
      fetchRepoInfo(owner, repo),
      fetchCommits(owner, repo, 100),
      fetchPullRequests(owner, repo),
    ]);

    const coding = analyzeCodingPatterns(commits, pullRequests);
    const stress = analyzeStress(commits, coding);
    const wellness = generateRecommendations(coding, stress);

    res.json({
      repo: {
        owner,
        name: repo,
        description: repoInfo.description,
        stars: repoInfo.stargazers_count,
        language: repoInfo.language,
      },
      coding,
      stress,
      wellness,
    });
  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
