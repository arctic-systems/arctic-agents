import Anthropic from "@anthropic-ai/sdk";
import { AGENTS, AgentID } from "./registry.js";

/**
 * Thin wrapper around the ALM model for generating responses.
 * This file demonstrates the structure of the interaction pipeline.
 */

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY
});

export async function runSLM(
  agent: AgentID,
  userText: string,
  context: string
): Promise<string> {
  const definition = AGENTS[agent];

  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 160,
    system: definition.systemPrompt,
    messages: [
      {
        role: "user",
        content:
          "context:\n" +
          context +
          "\n\nuser input:\n" +
          userText +
          `\n\nrespond as ${definition.label}.`
      }
    ]
  });

  const textBlock = completion.content?.find((b: any) => b.type === "text");
  return textBlock?.text ?? "";
}
