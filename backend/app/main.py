import os
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import (
    HealthResponse,
    GravityCalculationRequest,
    GravityCalculationResponse
)
from app.physics import compute_artificial_gravity

app = FastAPI(
    title="NASA HUNCH: Antigravity Research & Simulation API",
    description="Microgravity and centrifugal artificial gravity computation service for NASA HUNCH initiatives.",
    version="1.0.0"
)

# CORS configuration
allowed_origins_env = os.getenv("CORS_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["System"])
def root():
    return {
        "initiative": "NASA HUNCH: Antigravity Research & Simulation",
        "system": "Active",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    return HealthResponse(
        status="healthy",
        service="nasa-hunch-gravity-api",
        version="1.0.0",
        timestamp=datetime.now(timezone.utc).isoformat()
    )

@app.post("/api/calculate-gravity", response_model=GravityCalculationResponse, tags=["Simulation"])
def calculate_gravity(request: GravityCalculationRequest):
    return compute_artificial_gravity(request)
