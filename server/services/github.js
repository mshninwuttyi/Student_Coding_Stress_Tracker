import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || undefined,
});

export async function fetchRepoInfo(owner, repo) {
  const { data } = await octokit.repos.get({ owner, repo });
  return data;
}

export async function fetchCommits(owner, repo, perPage = 100) {
  const { data } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: perPage,
  });
  return data.map(commit => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name,
    email: commit.commit.author.email,
    date: commit.commit.author.date,
  }));
}

export async function fetchPullRequests(owner, repo) {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'all',
    per_page: 50,
    sort: 'updated',
    direction: 'desc',
  });
  return data.map(pr => ({
    number: pr.number,
    title: pr.title,
    state: pr.state,
    author: pr.user.login,
    createdAt: pr.created_at,
    mergedAt: pr.merged_at,
  }));
}
