import { clamp } from "./utils.js";

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

  const top = lessons[0];
  return {
    answer: `Based on the library: ${top.body}`,
    citations: [{ lessonId: top.id, lessonTitle: top.title }],
    confidence: 35,
  };
}
