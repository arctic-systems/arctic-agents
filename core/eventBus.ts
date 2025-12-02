/**
 * Typed event bus for internal modules to publish and subscribe
 * to workflow-related events.
 */

type EventHandler<T> = (payload: T) => void;

interface EventMap {
  "slm:reply": { agent: string; text: string };
  "token:buy": { mint: string; amount: number };
  "token:sell": { mint: string; amount: number };
  "integration:error": { source: string; message: string };
}

const handlers: {
  [K in keyof EventMap]?: EventHandler<EventMap[K]>[];
} = {};

export const EventBus = {
  on<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>) {
    if (!handlers[event]) handlers[event] = [];
    handlers[event]!.push(handler);
  },

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    handlers[event]?.forEach((h) => h(payload));
  }
};
