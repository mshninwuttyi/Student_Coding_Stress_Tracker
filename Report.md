# ch-4 Personal Project — Report

## Project

- **GitHub username:** @mshninwuttyi
- **Repo URL:** https://github.com/mshninwuttyi/Student_Coding_Stress_Tracker
- **Live / download URL:** https://student-coding-stress-tracker.vercel.app/
- **License:** MIT
- **One-line summary:** A web app that analyzes GitHub repository activity to detect coding workload imbalance and stress patterns in student developers, providing actionable wellness recommendations.

## Product-Intro Slides

- **Slides path:** slides/pitch.md

## Demo Screenshots

<!-- Add 3 / 5 / 10 screenshots. Put image files in your repo (e.g. screenshots/) and link them.
     Capture with Chrome DevTools MCP at a fixed resolution
     (desktop 1280×800, mobile 390×844). Note which you used.
     Syntax:  ![short caption](path/to/image.png)
     The image PATH must exist in your repo. -->

- **Resolution used:** 1280×800 desktop

![screenshot 1 — Start page with repo search input](screenshots/1-start-page.png)
![screenshot 2 — Dashboard before running analysis](screenshots/2-before-analyze.png)
![screenshot 3 — Dashboard after analysis with stress metrics and recommendations](screenshots/3-after-analyze.png)

## Notes (optional)

### How to Run

```bash
# Install all dependencies
npm run install:all

# Create .env in server/ with your GitHub token
echo "GITHUB_TOKEN=your_token" > server/.env

# Start both client and server
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3000

### Known Rough Edges

- Only works with public GitHub repositories
- Stress scoring is heuristic-based, not clinically validated
- No user authentication or saved history yet
