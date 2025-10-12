/**
 * Proof-of-concept TikTok trending checker.
 * This performs a single keyword search and extracts:
 * - total number of videos
 * - number containing hashtags
 * - sample descriptions
 *
 * The real system performs multiple passes and deep scanning.
 */

const HOST = "tiktok-api23.p.rapidapi.com";
const ENDPOINT = `https://${HOST}/api/search/video`;

export async function checkTikTok(keyword: string) {
  const apiKey =
    process.env.RAPIDAPI_TIKTOK_KEY || "";

  const headers = {
    "x-rapidapi-host": HOST,
    "x-rapidapi-key": apiKey
  };

  try {
    const url = `${ENDPOINT}?keyword=${encodeURIComponent(keyword)}`;
    const response = await fetch(url, { headers });
    const json = await response.json();

    if (!json || !Array.isArray(json.item_list)) {
      return { ok: false, reason: "No results" };
    }

    const items = json.item_list;
    const withTags = items.filter((i: any) =>
      /#\w+/.test(i.desc || "")
    );

    return {
      ok: true,
      total: items.length,
      tagged: withTags.length,
      sampleTags: withTags
        .slice(0, 5)
        .map((v: any) => v.desc || "")
    };
  } catch (err) {
    return { ok: false, reason: "Network error" };
  }
}
