/**
 * Demo script illustrating the entire Arctic workflow pipeline.
 *
 * To run:
 *   npm install
 *   npm run build
 *   npm start
 */

import { ArcticInterpreter } from "./pipeline/interpreter.js";

// instantiate interpreter with a sample agent
const interpreter = new ArcticInterpreter("astrid");

async function runDemo() {
  console.log("=== Arctic Workflow POC Demo ===\n");

  // Example 1: token metadata request
  const metaReply = await interpreter.handle(
    "tell me about 9xQeWvG816bUx9EPmJd2E77zj7ijA1rEU2Tc5h7hpDqU"
  );
  console.log("\n[Token Metadata Reply]\n" + metaReply);

  // Example 2: TikTok trending check
  const trendingReply = await interpreter.handle(
    "is this trending on tiktok"
  );
  console.log("\n[TikTok Trending Reply]\n" + trendingReply);

  // Example 3: general message
  const generalReply = await interpreter.handle(
    "so what do you think about the market"
  );
  console.log("\n[General SLM Reply]\n" + generalReply);

  console.log("\n=== Demo Complete ===");
}

runDemo();
