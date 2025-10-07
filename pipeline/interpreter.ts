/**
 * Core interpreter demonstrating the Arctic workflow pipeline:
 * - receive user input
 * - classify simple intent
 * - fetch external data when required
 * - synthesize context
 * - generate a final reply via the ALM wrapper
 *
 * This file is intentionally generic and does not include UI logic.
 */

import { runALM } from "../agents/alm.js";
import { fetchTokenSnapshot } from "../integrations/birdeye.js";
import { checkTikTok } from "../integrations/tiktok.js";

export class ArcticInterpreter {
  private agentId: any;
  private history: Array<{ role: string; text: string }>;
  private lastTokenTitle: string | null;

  constructor(agentId: any) {
    this.agentId = agentId;
    this.history = [];
    this.lastTokenTitle = null;
  }

  private record(role: string, text: string) {
    this.history.push({ role, text });
  }

  private contextTail(n: number = 6): string {
    return this.history
      .slice(-n)
      .map((m) => `${m.role}: ${m.text}`)
      .join("\n");
  }

  private extractContractAddress(input: string): string | null {
    const parts = input.split(/\s+/);
    return (
      parts.find(
        (w) => w.length >= 32 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(w)
      ) || null
    );
  }

  async handle(userInput: string): Promise<string> {
    this.record("user", userInput);
    const lower = userInput.toLowerCase();

    // Meme summary intent
    if (/tell me about|info on|details on|explain this/.test(lower)) {
      const address = this.extractContractAddress(userInput);
      if (!address) return this.generate("No address detected.");

      const meta = await fetchTokenSnapshot(address);
      if (!meta.ok) return this.generate("Token metadata unavailable.");

      this.lastTokenTitle = meta.name || meta.symbol || null;

      const summary =
        `Name: ${meta.name}\n` +
        `Symbol: ${meta.symbol}\n` +
        `Website: ${meta.links?.website || "None"}`;

      return this.generate(summary);
    }

    // TikTok trending intent
    if (/tiktok|trending/.test(lower)) {
      if (!this.lastTokenTitle) {
        return this.generate("A token summary must be requested first.");
      }

      const data = await checkTikTok(this.lastTokenTitle);
      if (!data.ok) return this.generate("No TikTok data available.");

      const report =
        `Videos found: ${data.total}\n` +
        `Tagged videos: ${data.tagged}\n` +
        `Examples:\n${data.sampleTags.join("\n")}`;

      return this.generate(report);
    }

    // Default fallback: ALM handles the message
    return this.generate(
      "General user message routed through ALM pipeline."
    );
  }

  private async generate(summary: string): Promise<string> {
    const output = await runALM(
      this.agentId,
      summary,
      this.contextTail()
    );
    this.record("agent", output);
    return output;
  }
}
