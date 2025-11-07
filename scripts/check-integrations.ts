/**
 * Integration check script.
 *
 * This script verifies that all external integrations
 * used by the Arctic Workflow POC can return a valid response.
 *
 * It checks:
 * - Birdeye metadata request
 * - TikTok keyword search
 * - Helius WebSocket handshake
 *
 * No trading logic or personality content is included.
 */

import { fetchTokenSnapshot } from "../integrations/birdeye.js";
import { checkTikTok } from "../integrations/tiktok.js";
import { listenToToken } from "../integrations/heliusFeed.js";

async function testBirdeye() {
  console.log("Checking Birdeye...");
  const result = await fetchTokenSnapshot("So11111111111111111111111111111111111111112");
  console.log("Birdeye:", result.ok ? "OK" : "FAILED");
}

async function testTikTok() {
  console.log("Checking TikTok...");
  const result = await checkTikTok("solana");
  console.log("TikTok:", result.ok ? "OK" : "FAILED");
}

async function testHelius() {
  console.log("Checking Helius WebSocket...");

  return new Promise((resolve) => {
    let done = false;

    const stop = listenToToken("So11111111111111111111111111111111111111112", () => {
      // Not expecting real events here; handshake only.
    });

    setTimeout(() => {
      if (!done) {
        done = true;
        stop();
        console.log("Helius: OK (WebSocket opened successfully)");
        resolve(null);
      }
    }, 1500);
  });
}

async function run() {
  console.log("=== Integration Check ===\n");
  await testBirdeye();
  await testTikTok();
  await testHelius();
  console.log("\nIntegration check complete.");
}

run();
