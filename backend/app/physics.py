import math
from datetime import datetime, timezone
from app.models import (
    GravityCalculationRequest,
    GravityCalculationResponse,
    CoriolisComfort,
    OrbitalTelemetry
)

STANDARD_GRAVITY = 9.80665  # m/s^2

def compute_artificial_gravity(req: GravityCalculationRequest) -> GravityCalculationResponse:
    radius = req.radius
    rpm = req.rpm
    mass = req.payload_mass or 85.0

    # Angular velocity: rad/s = (2 * pi * RPM) / 60
    omega = (2.0 * math.pi * rpm) / 60.0

    # Centripetal acceleration: a = omega^2 * r
    centripetal_accel = (omega ** 2) * radius

    # Artificial gravity in g-units
    g_force = centripetal_accel / STANDARD_GRAVITY

    # Tangential velocity: v = omega * r
    v_tangential = omega * radius
    v_tangential_kmh = v_tangential * 3.6

    # Structural rim tension force on payload: F = m * a
    rim_tension = mass * centripetal_accel

    # Coriolis cross-coupling comfort evaluation
    if rpm <= 3.0:
        rating = "OPTIMAL"
        score = 0.98 - (rpm * 0.05)
        explanation = "Ideal for human habitation. Minimal vestibular cross-coupling upon rapid head movement."
    elif rpm <= 6.0:
        rating = "ADAPTATION_REQUIRED"
        score = 0.80 - ((rpm - 3.0) * 0.12)
        explanation = "Acceptable with 24-48h neurovestibular adaptation. Minor illusory motion during head pitching."
    else:
        rating = "MOTION_SICKNESS_RISK"
        score = max(0.15, 0.45 - ((rpm - 6.0) * 0.08))
        explanation = "High Coriolis cross-coupling acceleration. High probability of motion sickness and disorientation."

    head_tilt_gradient = round(2.0 * omega * math.radians(45.0), 3)

    return GravityCalculationResponse(
        radius_m=round(radius, 2),
        rpm=round(rpm, 2),
        angular_velocity_rad_s=round(omega, 4),
        tangential_velocity_ms=round(v_tangential, 2),
        tangential_velocity_kmh=round(v_tangential_kmh, 2),
        centripetal_acceleration_ms2=round(centripetal_accel, 3),
        g_force=round(g_force, 4),
        rim_tension_force_n=round(rim_tension, 2),
        coriolis=CoriolisComfort(
            rating=rating,
            comfort_score=round(max(0.0, min(1.0, score)), 2),
            head_tilt_cross_coupling_degs=head_tilt_gradient,
            explanation=explanation
        ),
        orbital_telemetry=OrbitalTelemetry(),
        computed_at=datetime.now(timezone.utc).isoformat()
    )
