# Civicmatch (SchemeSetu) 🏛️

Civicmatch is a modern, full-stack AI platform designed to match Indian citizens with government schemes they are eligible for. The platform uses a dynamic interview flow to capture a user's demographic profile and evaluates it against an Explainable AI rules engine to provide highly accurate, confidence-scored scheme recommendations.

## 🌟 Features
- **Dynamic Citizen Profiling**: An intuitive interview flow capturing demographic, financial, and social data.
- **Explainable AI Rules Engine**: Evaluates citizen profiles against complex eligibility rules (e.g., income caps, land holdings, occupation) to generate matched schemes.
- **Confidence Scoring**: Highlights perfect matches (>80% confidence) and "almost eligible" schemes with specific gap analysis (e.g., "Requires land ownership details").
- **Auto-Seeding Database**: The backend automatically populates the SQLite database with 20+ active Indian government schemes (PM-KISAN, Ayushman Bharat, PMAY, etc.) on the first boot.
- **Premium UI**: A responsive, glassmorphism-inspired design system built with Tailwind CSS and Framer Motion.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Vercel

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Server**: Uvicorn
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Hosting**: Render

## 🚀 Live Deployment
- **Frontend (Vercel)**: [https://civicmatch-alpha.vercel.app](https://civicmatch-alpha.vercel.app)
- **Backend API (Render)**: [https://civicmatch-1.onrender.com/docs](https://civicmatch-1.onrender.com/docs)

## 💻 Local Development Setup

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the development server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   *Note: The database will automatically seed itself with 21 schemes on the first run.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the API URL:
   By default, the frontend is hardcoded to point to the live Render backend (`https://civicmatch-1.onrender.com`). If you want to test against your local backend, edit `frontend/src/app/results/page.tsx` and change the fetch URL to `http://localhost:8000/api/v1/recommend`.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:3000`.

## 📁 Project Structure
- `/frontend`: Contains the Next.js application, React components, and UI assets.
  - `/src/app/interview`: The citizen data collection form.
  - `/src/app/results`: The dynamic results page that fetches recommendations.
- `/backend`: Contains the FastAPI application, database models, and the AI engine.
  - `engine.py`: The core logic that evaluates eligibility rules.
  - `seed_schemes.py`: The script containing the 21 pre-configured government schemes.
  - `main.py`: The API endpoints and CORS configuration.
- `/legacy_prototype`: Initial boilerplate code (unused in production).

## 📄 License
This project is open-source and available for civic tech development.
