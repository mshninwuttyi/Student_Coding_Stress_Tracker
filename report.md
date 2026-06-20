# ch-3 Personal Project — Report

github_username: mshninwuttyi
personal_repo_url: https://github.com/mshninwuttyi/Student_Coding_Stress_Tracker
project_summary: A web app that analyzes GitHub repository activity for coding stress detection, using multi-agent analysis to identify burnout indicators and provide wellness recommendations.
slides_url: slides/pitch.md

## Methodology

I used a project-based approach to build a full-stack web application from scratch. Starting with Claude Code's MCP, skill, and agent configuration, I defined the analysis logic first (coding patterns, stress indicators, wellness recommendations), then built the Node.js Express API backend and React frontend around it. I committed code as I built each layer — backend services, API routes, React components — following a feature-at-a-time git workflow.

## Evidence — Claude Code usage

### MCP
- path: .mcp.json
- what: GitHub MCP server (`@modelcontextprotocol/server-github`) for fetching repository info, commit history, and pull request data directly from GitHub API. Used to analyze real commit timestamps, detect late-night coding, weekend work, and commit spikes.

### Skill
- path: .claude/skills/coding-stress-analysis/SKILL.md
- what: Defines the coding stress analysis methodology — reviews commit frequency, commit spikes, weekend coding, late-night activity, active repositories, and PR workload. Classifies risk as Low/Medium/High and outputs activity summary, risk assessment, and recommendations.

### Agent
- path: .claude/agents/coding-agent.md
- what: Software productivity analyst that examines repository activity, commit history, pull request patterns, and coding workflow to identify productivity trends and workload findings.

- path: .claude/agents/stress-agent.md
- what: Student wellness analyst that detects burnout indicators, identifies unhealthy work patterns (burst coding, deadline crunches, context switching), and assesses overall workload risk level.

- path: .claude/agents/wellness-agent.md
- what: Wellness coach that generates actionable recommendations, suggests study-life balance improvements, and promotes healthy coding habits based on the analysis results.
