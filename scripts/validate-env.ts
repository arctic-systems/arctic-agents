/**
 * Environment variable validator for Arctic Workflow POC.
 * Ensures that required integrations have the keys they need.
 */

const REQUIRED = [
  "CLAUDE_KEY",
  "BIRDEYE_KEY",
  "RAPIDAPI_TIKTOK_KEY",
  "HELIUS_KEY"
];

let missing = [];

for (const key of REQUIRED) {
  if (!process.env[key] || process.env[key]?.trim() === "") {
    missing.push(key);
  }
}

if (missing.length > 0) {
  console.error("Missing required environment variables:");
  for (const m of missing) console.error("  - " + m);
  process.exit(1);
} else {
  console.log("Environment validation passed.");
}
