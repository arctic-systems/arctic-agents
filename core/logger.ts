/**
 * Central logging utility for consistent output across modules.
 */

import { CONFIG } from "./config.js";

const LEVELS = ["debug", "info", "warn", "error"] as const;

function shouldLog(level: typeof LEVELS[number]) {
  return (
    LEVELS.indexOf(level) >= LEVELS.indexOf(CONFIG.logLevel)
  );
}

export const log = {
  debug(msg: string) {
    if (shouldLog("debug")) console.log("[DEBUG]", msg);
  },
  info(msg: string) {
    if (shouldLog("info")) console.log("[INFO]", msg);
  },
  warn(msg: string) {
    if (shouldLog("warn")) console.warn("[WARN]", msg);
  },
  error(msg: string) {
    if (shouldLog("error")) console.error("[ERROR]", msg);
  }
};
