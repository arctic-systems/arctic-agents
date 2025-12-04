/**
 * Core interpreter demonstrating the Arctic workflow pipeline:
 * - receive user input
 * - classify simple intent
 * - fetch external data when required
 * - optionally route complex tasks to Swarms
 * - synthesize context
 * - generate final reply via ALM wrapper
 */

import { runALM } from "../agents/alm.js";
import { fetchTokenSnapshot } from "../integrations/birdeye.js";
import { checkTikTok } from "../integrations/tiktok.js";
import { AGENTS } from "../agents/registry.js";

import { spawn } from "child_process";
import path from "path";

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

  // -------------------------------
  // Swarms bridge (Node → Python)
  // -------------------------------
  private async runSwarms(task: string, strategy = "sequential") {
    return new Promise((resolve) => {
      const script = path.join(
        __dirname,
        "../integrations/swarms/run_swarms.py"
      );

      // Transform Arctic registry into JSON to pass to Python
      const registryPayload = JSON.stringify(
        Object.values(AGENTS).map((a) => ({
          id: a.id,
          label: a.label,
          systemPrompt: a.systemPrompt
        }))
      );

      const proc = spawn("python", [script, task, strategy, registryPayload]);

      let result = "";
      let err = "";

      proc.stdout.on("data", (d) => (result += d.toString()));
      proc.stderr.on("data", (e) => (err += e.toString()));

      proc.on("close", () => {
        if (err.length > 0) console.error("SWARMS ERROR:", err);

        try {
          resolve(JSON.parse(result));
        } catch {
          resolve(result);
        }
      });
    });
  }

  private isMultiStepIntent(input: string): boolean {
    const lower = input.toLowerCase();
    return (
      /research|analyze|deep dive|long report|multi step|multi-step|break down/.test(
        lower
      ) ||
      lower.length > 300
    );
  }

  // --------------------------------------------------
  //                MAIN ENTRYPOINT
  // --------------------------------------------------
  async handle(userInput: string): Promise<string> {
    this.record("user", userInput);
    const lower = userInput.toLowerCase();

    // --------------------------------------------
    // 1. Meme summary intent
    // --------------------------------------------
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

    // --------------------------------------------
    // 2. TikTok trending intent
    // --------------------------------------------
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

    // --------------------------------------------
    // 3. Multi-step / research → SWARMS PIPELINE
    // --------------------------------------------
    if (this.isMultiStepIntent(userInput)) {
      const swarmOut: any = await this.runSwarms(userInput, "sequential");
      return this.generate(JSON.stringify(swarmOut, null, 2));
    }

    // --------------------------------------------
    // 4. Fallback → ALM
    // --------------------------------------------
    return this.generate("General user message routed through ALM pipeline.");
  }

  // --------------------------------------------------
  //           ALM WRAPPER CONNECTION
  // --------------------------------------------------
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
