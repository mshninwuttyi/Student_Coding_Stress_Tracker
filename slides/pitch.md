---
marp: true
paginate: true
transition: fade
# PechaKucha: 6 slides, 20s auto-advance. Do not change the count.
auto-advance: 20
---

<!-- slide 1 -->
# Who's my person?
**Student developers** juggling multiple coding projects — burning out silently with late-night commits, deadline crunches, and no visibility into their own workload patterns.
<!-- 20s -->

---

<!-- slide 2 -->
# Their problem
- 🔥 Late-night coding becomes a habit (midnight commits)
- 📈 Burst patterns: silence for weeks, then frantic pushes
- 🏖️ Weekends disappear into code
- 🤯 30+ repos, no idea which ones are causing stress
- ❌ No tool to visualize coding workload imbalance
<!-- 20s -->

---

<!-- slide 3 -->
# What I built
**Student Coding Stress Tracker** — a web app that analyzes any GitHub repo and detects stress indicators:
- 📊 Commit timeline chart
- 🎯 Stress gauge (Low / Medium / High)
- 📋 6-dimension risk matrix
- 💡 Personalized wellness recommendations
<!-- 20s -->

---

<!-- slide 4 -->
# How I built it
- **MCP**: GitHub server — fetches real commits, PRs, and repo data via `@modelcontextprotocol/server-github`
- **Skill**: `coding-stress-analysis` — defines the methodology: commit frequency, spikes, weekend/late-night coding, gaps, PR workload
- **Agent**: 3 agents working in parallel — `coding-agent` (patterns), `stress-agent` (risk detection), `wellness-agent` (recommendations)
<!-- 20s -->

---

<!-- slide 5 -->
# Why it matters
- 🎓 Students don't realize they're burning out until it's too late
- 📉 Early detection = better habits = healthier developers
- 🔬 Data-driven insights instead of guessing
- 🌐 Works on any public GitHub repo — open source & reusable
<!-- 20s -->

---

<!-- slide 6 -->
# Done checklist
- [x] repo public
- [x] MCP + skill + agent used
- [x] report.md in team repo
- [x] Full-stack web app (React + Express + GitHub API)
- [x] 3 agents analyze from different perspectives
<!-- 20s -->
