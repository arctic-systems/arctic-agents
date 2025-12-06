import { clamp } from "./utils.js";

export function normalizeLessons(raw) {
  const arr = Array.isArray(raw) ? raw : [];
  return arr
    .map((x) => ({
      id: clamp(x?.id, 80),
      title: clamp(x?.title, 140),
      body: clamp(x?.body, 2600),
      tags: Array.isArray(x?.tags)
        ? x.tags.map((t) => clamp(t, 32)).filter(Boolean)
        : [],
      createdAt: typeof x?.createdAt === "number" ? x.createdAt : 0,
    }))
    .filter((l) => l.id && l.title && l.body)
    .slice(0, 18);
}

export function buildKnowledgePack(lessons) {
  return lessons
    .map((l, i) => {
      const tagLine = l.tags?.length ? `Tags: ${l.tags.join(", ")}` : "Tags: (none)";
      return `LESSON_${i + 1} {id:${l.id}}\nTitle: ${l.title}\n${tagLine}\nBody: ${l.body}`;
    })
    .join("\n\n---\n\n");
}
