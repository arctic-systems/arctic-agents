import { clamp } from "./utils.js";
import { buildKnowledgePack } from "./knowledge.js";

export async function runInference({ question, lessons }) {
  const q = clamp(question, 500);

  if (!lessons.length) {
    return {
      answer:
        "I don't know yet. Teach a relevant lesson so I can answer next time.",
      citations: [],
      confidence: 10,
    };
  }

  // Generic “pack” to feed any engine later.
  const pack = buildKnowledgePack(lessons);

  // Stub behavior for this repo:
  // Return a short grounded answer based on the first snippet.
  const top = lessons[0];
  return {
    answer: `Grounded in the library: ${top.body}`,
    citations: [{ lessonId: top.id, lessonTitle: top.title }],
    confidence: 40,
    // pack is intentionally NOT returned (keeps surface API clean)
  };
}
