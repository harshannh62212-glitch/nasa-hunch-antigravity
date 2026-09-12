export interface GravityRequest {
  radius: number;
  rpm: number;
  payload_mass?: number;
}

export interface CoriolisComfort {
  rating: "OPTIMAL" | "ADAPTATION_REQUIRED" | "MOTION_SICKNESS_RISK";
  comfort_score: number;
  head_tilt_cross_coupling_degs: number;
  explanation: string;
}

export interface OrbitalTelemetry {
  simulated_orbit_name: string;
  altitude_km: number;
  orbital_velocity_kms: number;
  ambient_microgravity_g: number;
  orbital_period_minutes: number;
}

export interface GravityCalculationResult {
  radius_m: number;
  rpm: number;
  angular_velocity_rad_s: number;
  tangential_velocity_ms: number;
  tangential_velocity_kmh: number;
  centripetal_acceleration_ms2: number;
  g_force: number;
  rim_tension_force_n: number;
  coriolis: CoriolisComfort;
  orbital_telemetry: OrbitalTelemetry;
  computed_at: string;
  is_backend_sync?: boolean;
}

export const STANDARD_GRAVITY = 9.80665; // m/s^2

export function computeLocalGravity(
  radius: number,
  rpm: number,
  payload_mass: number = 85.0
): GravityCalculationResult {
  const omega = (2.0 * Math.PI * rpm) / 60.0;
  const centripetal_accel = Math.pow(omega, 2) * radius;
  const g_force = centripetal_accel / STANDARD_GRAVITY;
  const v_tangential = omega * radius;
  const v_tangential_kmh = v_tangential * 3.6;
  const rim_tension = payload_mass * centripetal_accel;

  let rating: "OPTIMAL" | "ADAPTATION_REQUIRED" | "MOTION_SICKNESS_RISK";
  let score: number;
  let explanation: string;

  if (rpm <= 3.0) {
    rating = "OPTIMAL";
    score = 0.98 - rpm * 0.05;
    explanation = "Optimal human tolerance. Minimal vestibular cross-coupling disturbance.";
  } else if (rpm <= 6.0) {
    rating = "ADAPTATION_REQUIRED";
    score = 0.8 - (rpm - 3.0) * 0.12;
    explanation = "Tolerable with short adaptation window (24-48h). Minor head tilt illusions.";
  } else {
    rating = "MOTION_SICKNESS_RISK";
    score = Math.max(0.15, 0.45 - (rpm - 6.0) * 0.08);
    explanation = "High risk of motion sickness & vestibular disorientation during head rotation.";
  }

  const head_tilt_gradient = Number((2.0 * omega * (Math.PI / 4.0)).toFixed(3));

  return {
    radius_m: Number(radius.toFixed(2)),
    rpm: Number(rpm.toFixed(2)),
    angular_velocity_rad_s: Number(omega.toFixed(4)),
    tangential_velocity_ms: Number(v_tangential.toFixed(2)),
    tangential_velocity_kmh: Number(v_tangential_kmh.toFixed(2)),
    centripetal_acceleration_ms2: Number(centripetal_accel.toFixed(3)),
    g_force: Number(g_force.toFixed(4)),
    rim_tension_force_n: Number(rim_tension.toFixed(2)),
    coriolis: {
      rating,
      comfort_score: Number(Math.max(0, Math.min(1, score)).toFixed(2)),
      head_tilt_cross_coupling_degs: head_tilt_gradient,
      explanation,
    },
    orbital_telemetry: {
      simulated_orbit_name: "Low Earth Orbit (LEO) - ISS Co-flight",
      altitude_km: 408.0,
      orbital_velocity_kms: 7.66,
      ambient_microgravity_g: 0.000001,
      orbital_period_minutes: 92.68,
    },
    computed_at: new Date().toISOString(),
    is_backend_sync: false,
  };
}

export interface PresetMission {
  id: string;
  name: string;
  targetG: string;
  radius: number;
  rpm: number;
  description: string;
}

export const PRESET_MISSIONS: PresetMission[] = [
  {
    id: "earth-standard",
    name: "Earth 1.0G (Standard)",
    targetG: "1.00g",
    radius: 56.0,
    rpm: 4.0,
    description: "Full terrestrial gravity counteracting muscle atrophy and bone demineralization.",
  },
  {
    id: "mars-gravity",
    name: "Mars 0.38G",
    targetG: "0.38g",
    radius: 40.0,
    rpm: 2.9,
    description: "Martian gravity simulation to acclimate astronauts for surface descent.",
  },
  {
    id: "lunar-gravity",
    name: "Lunar 0.16G",
    targetG: "0.16g",
    radius: 30.0,
    rpm: 2.2,
    description: "Artemis & lunar surface gravity emulation for low-g habitat operations.",
  },
  {
    id: "micro-centrifuge",
    name: "ISS Nano-Rack Lab",
    targetG: "0.05g - 0.5g",
    radius: 12.0,
    rpm: 4.5,
    description: "Compact research module fitting within payload envelopes for biology testing.",
  },
];
