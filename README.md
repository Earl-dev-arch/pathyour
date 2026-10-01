# Your Path — responsive website prototype

Open `index.html` in a modern browser on PC or mobile.

## Included
- Responsive UI inspired by the supplied Your Path dashboard design
- Login + registration screens
- Student profile
- 20-question deep questionnaire
- Multiple choice, multi-select, scenario, ranking, scale and open-ended questions
- Local demo analysis with contradiction/uncertainty language
- Multiple pathway cards
- Save pathways
- Pathway comparison
- Grade-aware roadmap example
- Feedback form
- Demo admin dashboard
- Privacy notice and production security checklist
- Cookie/local-storage preference banner
- No external JavaScript libraries required

## Demo admin
Email: `admin@yourpath.demo`
Password: `admin123`

This is intentionally a frontend prototype. It is NOT production authentication or secure storage.

## Production architecture recommendation
Frontend: Next.js/React or similar.
Backend: Node.js/NestJS/Express or Python/FastAPI.
Database: PostgreSQL.
Authentication: secure managed auth or server-side sessions/OAuth.
AI: server-side API calls only; never put provider API keys in browser JavaScript.
Research: scheduled ingestion from authoritative career/education sources with citations and timestamps.
Security: HTTPS, encryption at rest, RBAC, audit logging, rate limiting, CSRF protection, input validation, backups, deletion/retention controls, age/consent flows, and privacy review for minors.

## Important
Salary, demand, university admissions and other time-sensitive facts in a real deployment should be fetched from current, attributable sources and shown with source/date information. The pathway content in this prototype is illustrative.
