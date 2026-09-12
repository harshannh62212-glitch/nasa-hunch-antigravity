# NASA HUNCH: Microgravity & Antigravity Research Initiative

> A modern, responsive full-stack web application showcasing centrifugal artificial gravity simulations, flight hardware specifications, and physics telemetry developed under the NASA HUNCH (High Schools United with NASA to Create Hardware) program.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/harshannh62212-glitch/nasa-hunch-antigravity)
[![Vercel](https://vercelbadge.vimpl.workers.dev/harshans-projects-9cb07fd2/nasa-hunch-antigravity)](https://nasa-hunch-antigravity-mbvji7w54-harshans-projects-9cb07fd2.vercel.app)

---

## 🚀 Architecture Overview

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts, and dynamic HTML5 Canvas visualizer. Deployed on **Vercel**.
- **Backend**: Lightweight Python (FastAPI) web service deployed on **Render** (via Dockerfile).
- **Physics Engine**: Hybrid architecture providing instantaneous client-side 60fps simulation updates while supporting verifiable calculations via FastAPI endpoints with live round-trip latency telemetry.

---

## 📂 Project Structure

```
nasa-hunch-antigravity/
├── frontend/                        # Next.js 14 App Router
│   ├── src/
│   │   ├── app/                     # layout.tsx, globals.css, page.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Mission brand & live API status pill
│   │   │   ├── HeroSection.tsx      # Aerospace hero & telemetry stats
│   │   │   ├── SimulationDashboard.tsx # Kinematic controls, presets & API sync
│   │   │   ├── CentrifugeCanvas.tsx # Real-time rotating space station visualizer
│   │   │   ├── GravityChart.tsx     # Radius vs. G-force and Mass vs. Tension curves
│   │   │   ├── ResearchSection.tsx  # Tabs: Methodology, ISS Specs, CAD, Contributors
│   │   │   ├── WhitepaperModal.tsx  # Downloadable technical memorandum & viewer
│   │   │   └── Footer.tsx           # Mission disclaimer & stack reference
│   │   └── lib/
│   │       ├── api.ts               # Backend client with offline fallback
│   │       └── physics.ts           # Standard formulas & preset mission architectures
│   ├── next.config.mjs              # NEXT_PUBLIC_API_URL environment mapping
│   ├── vercel.json                  # Zero-configuration Vercel deployment manifest
│   ├── tailwind.config.ts           # Dark aerospace theme & custom animations
│   └── package.json
│
├── backend/                         # FastAPI microservice
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # CORS middleware, /api/health, /api/calculate-gravity
│   │   ├── models.py                # Pydantic schemas
│   │   └── physics.py               # Centrifugal, Coriolis & orbital calculation engine
│   ├── Dockerfile                   # python:3.11-slim, port 8000, production uvicorn
│   ├── requirements.txt
│   └── .env.example
│
├── render.yaml                      # Render Infrastructure-as-Code Blueprint
└── README.md
```

---

## 🧪 Physics Formulations

1. **Centripetal Acceleration**:
   $$a_c = \omega^2 \cdot r = \left(\frac{2\pi \cdot \text{RPM}}{60}\right)^2 \cdot r \quad (\text{m/s}^2)$$

2. **Effective Artificial Gravity**:
   $$g_{\text{eff}} = \frac{a_c}{9.80665} \quad (\text{g-units})$$

3. **Tangential Rim Velocity**:
   $$v_t = \omega \cdot r \quad (\text{m/s})$$

4. **Structural Rim Normal Force**:
   $$F_N = m_{\text{payload}} \cdot a_c \quad (\text{Newtons})$$

5. **Coriolis Cross-Coupling Vestibular Limit**:
   - $\text{RPM} \le 3.0$: Optimal human tolerance. Minimal vestibular cross-coupling.
   - $3.0 < \text{RPM} \le 6.0$: Adaptation window required (24–48 hours).
   - $\text{RPM} > 6.0$: High motion sickness risk during rapid head pitching.

---

## 🛠️ Local Development

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000)

---

## 🚢 Production Deployment

### Backend on Render (via Dockerfile)
1. Push the repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New + > Blueprint** and select this repo (it reads [`render.yaml`](./render.yaml) automatically).
3. Alternatively, create a **Web Service**:
   - **Environment**: Docker
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Docker Context**: `backend`
   - **Health Check Path**: `/api/health`
4. Copy your deployed Render URL (e.g. `https://nasa-hunch-gravity-api.onrender.com`).

### Frontend on Vercel
1. In the [Vercel Dashboard](https://vercel.com), import this repository.
2. Set the **Root Directory** to `frontend`.
3. Under **Environment Variables**, add:
   ```
   NEXT_PUBLIC_API_URL = https://nasa-hunch-gravity-api.onrender.com
   ```
4. Deploy! Vercel will automatically read [`frontend/vercel.json`](./frontend/vercel.json) and build the Next.js application.
