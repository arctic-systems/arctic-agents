/**
 * Minimal conceptual agent registry.
 * This file only demonstrates structure, not proprietary personalities.
 */

export type AgentID = "astrid" | "yuki" | "sora" | "lumi";

export interface AgentDefinition {
  id: AgentID;
  label: string;
  systemPrompt: string;
}

export const AGENTS: Record<AgentID, AgentDefinition> = {
  astrid: {
    id: "astrid",
    label: "Agent A",
    systemPrompt: "System instructions for Agent A (placeholder)."
  },
  yuki: {
    id: "yuki",
    label: "Agent B",
    systemPrompt: "System instructions for Agent B (placeholder)."
  },
  sora: {
    id: "sora",
    label: "Agent C",
    systemPrompt: "System instructions for Agent C (placeholder)."
  },
  lumi: {
    id: "lumi",
    label: "Agent D",
    systemPrompt: "System instructions for Agent D (placeholder)."
  }
};
