const QUEUE_KEY = "lentejuelas_offline_queue";

interface QueuedOperation {
  id: string;
  path: string;
  options: {
    method: string;
    body?: string;
  };
  timestamp: number;
}

export function getQueue(): QueuedOperation[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToQueue(
  path: string,
  options: { method: string; body?: string }
) {
  const queue = getQueue();
  queue.push({
    id: crypto.randomUUID(),
    path,
    options,
    timestamp: Date.now(),
  });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function removeFromQueue(id: string) {
  const queue = getQueue().filter((op) => op.id !== id);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function processQueue(
  fetchCore: (path: string, options?: RequestInit) => Promise<any>
) {
  const queue = getQueue();
  const failed: QueuedOperation[] = [];

  for (const op of queue) {
    try {
      const res = await fetchCore(op.path, {
        method: op.options.method,
        headers: { "Content-Type": "application/json" },
        body: op.options.body,
      });
      if (!res.success) {
        failed.push(op);
      }
    } catch {
      failed.push(op);
    }
  }

  localStorage.setItem(QUEUE_KEY, JSON.stringify(failed));
  return { processed: queue.length - failed.length, failed: failed.length };
}

export function startQueueProcessor(
  fetchCore: (path: string, options?: RequestInit) => Promise<any>
) {
  // Intentar procesar cola cada 30 segundos
  setInterval(() => {
    const queue = getQueue();
    if (queue.length > 0) {
      processQueue(fetchCore);
    }
  }, 30000);

  // Procesar inmediatamente al iniciar
  const queue = getQueue();
  if (queue.length > 0) {
    processQueue(fetchCore);
  }
}
