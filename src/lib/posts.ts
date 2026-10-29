import { getCollection, type CollectionEntry } from "astro:content";
import { categoryNames } from "../data/post-options";
import type { Language } from "../i18n";

export type PostSummary = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  minutes: number;
  // The post's first image, shown on the list card. Empty when it has none.
  cover: string;
};
export const categories = categoryNames;

export async function getPosts(lang: Language) {
  return (
    await getCollection(
      "posts",
      ({ data }) => !data.draft && data.lang === lang,
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export function summarize(post: CollectionEntry<"posts">): PostSummary {
  const id = getPostId(post);
  return {
    id,
    ...post.data,
    date: post.data.date.toISOString().slice(0, 10),
    minutes: readingMinutes(post.body ?? "", post.data.lang),
    cover: firstImage(post.body ?? "") ?? "",
  };
}
// First Markdown image in the body: ![alt](url).
function firstImage(body: string): string | undefined {
  return body.match(/!\[[^\]]*\]\(\s*(\S+?)\s*\)/)?.[1];
}
export function countWords(body: string): number {
  if (!body) return 0;
  const cjkMatches = body.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;
  const nonCjk = body.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, " ");
  const westernCount = nonCjk.trim().split(/\s+/).filter(Boolean).length;
  return cjkCount + westernCount;
}
function readingMinutes(body: string, lang: string): number {
  const words = countWords(body);
  const rate = lang === "zh" ? 350 : lang === "es" ? 180 : 200;
  return Math.max(1, Math.ceil(words / rate));
}
export function getPostId(post: CollectionEntry<"posts">): string {
  const prefix = `${post.data.lang.toLowerCase()}/`;
  return post.id.startsWith(prefix) ? post.id.slice(prefix.length) : post.id;
}
export function getTags(posts: PostSummary[]) {
  return [...new Set(posts.flatMap((post) => post.tags))];
}
