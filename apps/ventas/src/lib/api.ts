import { addToQueue } from "./offlineQueue";
const CORE_API =
  process.env.NEXT_PUBLIC_CORE_API_URL || "http://localhost:3001/api";
export async function fetchCore(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${CORE_API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: res.statusText }));
      return { success: false, error: error.error || res.statusText };
    }
    return res.json();
  } catch (err: any) {
    // Si falla, guardar en cola para reintentar
    if (options?.method && options.method !== "GET") {
      addToQueue(path, {
        method: options.method,
        body: options.body as string,
      });
    }
    console.error("fetchCore error (encolado):", err.message);
    return {
      success: false,
      error: "Operación encolada. Se procesará cuando Core esté disponible.",
    };
  }
}
