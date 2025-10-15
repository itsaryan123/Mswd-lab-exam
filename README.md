# Course Uniform Project

Full-stack example (React + Node/Express + MongoDB Atlas) that includes:
- A reusable `UniformForm` React component with inputs: name, email, phone.
- Frontend UI to add new courses and view all courses stored in MongoDB Atlas.
- Backend API (Express + Mongoose) with endpoints:
  - `GET /api/courses` - list all courses
  - `POST /api/courses` - add a new course

## Setup

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGODB_URI` (your MongoDB Atlas connection string) and `PORT` (default 5000).
3. `npm install`
4. `npm run dev` (requires nodemon) or `node server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Vite) — default runs on `http://localhost:5173`
4. Make sure the backend is running on the configured port (default 5000). If CORS or host settings differ, update `src/api.js`.

## Notes
- This project is set up for local development. For deployment, secure your environment variables and set correct production CORS/origin settings.
- Replace the example MongoDB connection string with your Atlas URI.

"# Mswd-lab-exam" 
