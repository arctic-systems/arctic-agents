/**
 * Typed configuration loader with minimal validation.
 */

export interface ArcticConfig {
  claudeKey: string;
  birdeyeKey: string;
  tiktokKey: string;
  heliusKey: string;
  logLevel: "debug" | "info" | "warn" | "error";
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error("Missing environment variable: " + key);
  }
  return value.trim();
}

export const CONFIG: ArcticConfig = {
  claudeKey: requireEnv("CLAUDE_KEY"),
  birdeyeKey: requireEnv("BIRDEYE_KEY"),
  tiktokKey: requireEnv("RAPIDAPI_TIKTOK_KEY"),
  heliusKey: requireEnv("HELIUS_KEY"),
  logLevel: (process.env.LOG_LEVEL as any) || "info"
};
