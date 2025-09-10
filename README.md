# Numerology Calculator — Next.js (Vercel-ready)

This repository contains a professional-level Numerology Calculator built with **Next.js** and a Node.js API route. It's ready to deploy on **Vercel**.

## Structure
- pages/
  - index.jsx           # Frontend UI
  - api/numerology.js   # Serverless API endpoint
- lib/
  - numerology.js       # Core numerology logic
- components/
  - Report.jsx          # Report renderer
- package.json

## Quick start (local)
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

## Deploy to Vercel
1. Push to GitHub.
2. Import the repository on Vercel (https://vercel.com/import).
3. Vercel auto-detects Next.js and deploys.

## Notes
- This project is a starter template. Customize interpretation templates, add localization (Bengali), PDF export, and rate-limiting per your needs.
- The numerology logic is in `lib/numerology.js`. Unit-test it before production use.
