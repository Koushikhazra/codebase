# CodeBase — DSA Revision Hub

✅ Project Description

CodeVault is a full-stack web application designed to help developers organize, store, and revise coding questions efficiently.
It provides a personalized environment where users can log in, manage their question bank, filter by topic or difficulty, and revise intelligently using a built-in revision system.

The platform is built with a focus on productivity, fast navigation, and a clean developer-friendly workflow. With features like secure authentication, topic-based categorization, smart search, and a 5-question random revision mode, CodeVault becomes a reliable tool for interview preparation, algorithm practice, and long-term learning.

--

## ✅ Key Highlights

🧠 Store coding questions with topics, difficulty levels, solutions, and notes

🔍 Smart search & filtering for rapid navigation

🔒 Secure JWT-based authentication for private question management

📚 Revision Mode that generates 5 random questions and tracks progress

🌗 Dark Mode support for comfortable long coding sessions

⚡ Fast and responsive UI built with React + Tailwind

🗂️ Topic pre-filtering (click a topic → instantly shows relevant questions)
## Tech stack

- Frontend: React (Vite), Tailwind CSS, Lucide icons
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: JWT (jsonwebtoken), password hashing with bcryptjs
- Dev tools: Vite, concurrently, ESLint

## Quick start (developer)

Prerequisites:

- Node.js (v18+ recommended)
- MongoDB (local or cloud Atlas)

1. Clone the repo

```powershell
git clone https://github.com/Koushikhazra/hkous.git
cd CodeVault
```

2. Install dependencies

```powershell
npm install
```

3. Create a `.env` file in the project root (same folder as `server/server.js`) with the following keys:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
# Optional
PORT=3001
```

4. Run the app for development (two options):

- Start frontend only:

```powershell
npm run dev
```

- Start backend only:

```powershell
npm run server
```

- Start both frontend and backend together (recommended during development):

```powershell
npm run dev:full
```

The frontend runs via Vite (default port shown in terminal) and the backend serves API on http://localhost:3001 by default.

5. Build for production

```powershell
npm run build
```

And preview the production build with:

```powershell
npm run preview
```

## Environment variables

- MONGODB_URI — MongoDB connection string (required)
- JWT_SECRET — secret used for signing JWTs (required)
- PORT — backend port (defaults to 3001)

Keep secrets out of source control. Use a secrets manager or environment config for production.

## API (high level)

Base URL: http://localhost:3001/api

Auth
- POST /api/auth/register — register with { username, email, password }
- POST /api/auth/login — login with { email, password }
- GET /api/auth/me — get current user (requires Authorization header)

Questions (auth required)
- GET /api/questions — list user's questions
- POST /api/questions — create question
- PUT /api/questions/:id — update question
- DELETE /api/questions/:id — delete question
- GET /api/questions/random/:count — get random questions for revision

Topics (auth required)
- GET /api/topics — list topics for user
- GET /api/topics/stats — per-topic stats (total/revised)

The frontend uses `src/services/api.js` and expects the API at `http://localhost:3001/api` by default — update `API_BASE_URL` there if you host the API elsewhere.

## Project structure (important files)

- `server/` — Express backend
	- `server.js` — app entry (connects MongoDB, mounts routes)
	- `routes/` — `auth.js`, `questions.js`, `topics.js`
	- `models/` — Mongoose models (User, Question, Topic)
	- `middleware/auth.js` — JWT auth middleware
- `src/` — React frontend
	- `components/` — pages and UI components (HomePage, QuestionsPage, RevisionPage, LoginForm)
	- `context/AppContext.jsx` — app state and API wiring
	- `services/api.js` — frontend API client
- `package.json` — scripts and dependencies

## Notes for contributors

- Keep API changes backward-compatible where possible.
- Add tests for new features (unit + integration) and update README with endpoints if you change them.
- Formatting and linting: run `npm run lint` before opening a PR.

## Possible improvements / next steps

- Add user profile and export/import of question bank
- Add tagging and richer search (fuzzy search)
- Add client-side tests (React Testing Library) and server tests (Jest + Supertest)
- Add CI (GitHub Actions) to run lint and tests

## License

This project is provided under the MIT License. See `LICENSE` (or add one) to include license text.

---

If you'd like, I can also:

- add screenshots or a demo GIF to the README
- generate a small `.env.example` file
- add a CONTRIBUTING.md and a basic GitHub Actions workflow to run linting

Tell me which of those you'd like next and I will add them.
