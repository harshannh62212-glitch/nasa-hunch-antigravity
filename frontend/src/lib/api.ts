import {
  GravityCalculationResult,
  GravityRequest,
  computeLocalGravity,
} from "./physics";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:8000";

export interface ApiHealthStatus {
  online: boolean;
  service?: string;
  version?: string;
  latencyMs?: number;
  error?: string;
}

export async function checkBackendHealth(): Promise<ApiHealthStatus> {
  const start = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json();
      return {
        online: true,
        service: data.service,
        version: data.version,
        latencyMs,
      };
    }
    return {
      online: false,
      latencyMs,
      error: `HTTP ${res.status}: ${res.statusText}`,
    };
  } catch (err: any) {
    return {
      online: false,
      latencyMs: Math.round(performance.now() - start),
      error: err.name === "AbortError" ? "Request Timeout (3.5s)" : "Render/Local API Offline",
    };
  }
}

export async function calculateGravityAPI(
  req: GravityRequest
): Promise<{ result: GravityCalculationResult; fromBackend: boolean; latencyMs: number }> {
  const start = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/api/calculate-gravity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        radius: req.radius,
        rpm: req.rpm,
        payload_mass: req.payload_mass ?? 85.0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json();
      return {
        result: { ...data, is_backend_sync: true },
        fromBackend: true,
        latencyMs,
      };
    }
    throw new Error(`API returned HTTP ${res.status}`);
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    // Fallback gracefully to local client physics engine
    const local = computeLocalGravity(req.radius, req.rpm, req.payload_mass);
    return {
      result: { ...local, is_backend_sync: false },
      fromBackend: false,
      latencyMs,
    };
  }
}

export { API_BASE_URL };
