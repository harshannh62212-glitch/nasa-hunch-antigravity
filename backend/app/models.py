from pydantic import BaseModel, Field
from typing import Optional

class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    service: str = Field(..., example="nasa-hunch-gravity-api")
    version: str = Field(..., example="1.0.0")
    timestamp: str

class GravityCalculationRequest(BaseModel):
    radius: float = Field(
        ...,
        gt=0,
        le=1000,
        description="Centrifuge radius in meters (1 to 1000m)",
        example=56.0
    )
    rpm: float = Field(
        ...,
        ge=0,
        le=50,
        description="Rotations per minute (0 to 50 RPM)",
        example=4.0
    )
    payload_mass: Optional[float] = Field(
        default=85.0,
        gt=0,
        description="Crew or payload mass in kg for tension force calculation",
        example=85.0
    )

class CoriolisComfort(BaseModel):
    rating: str = Field(..., description="Comfort category: OPTIMAL, ADAPTATION_REQUIRED, or MOTION_SICKNESS_RISK")
    comfort_score: float = Field(..., description="Normalized score 0.0 to 1.0 (1.0 being most comfortable)")
    head_tilt_cross_coupling_degs: float = Field(..., description="Estimated cross-coupling angular velocity gradient")
    explanation: str

class OrbitalTelemetry(BaseModel):
    simulated_orbit_name: str = "Low Earth Orbit (LEO) - ISS Co-flight"
    altitude_km: float = 408.0
    orbital_velocity_kms: float = 7.66
    ambient_microgravity_g: float = 0.000001
    orbital_period_minutes: float = 92.68

class GravityCalculationResponse(BaseModel):
    radius_m: float
    rpm: float
    angular_velocity_rad_s: float
    tangential_velocity_ms: float
    tangential_velocity_kmh: float
    centripetal_acceleration_ms2: float
    g_force: float
    rim_tension_force_n: float
    coriolis: CoriolisComfort
    orbital_telemetry: OrbitalTelemetry
    computed_at: str
