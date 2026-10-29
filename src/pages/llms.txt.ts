import type { APIRoute } from "astro";
import { getPersonalInfo, getSiteInfo } from "../config";
import { defaultLanguage, languages, localizePath, translate } from "../i18n";
import { getPostId, getPosts } from "../lib/posts";
import { AIRPORT_BRANDS } from "../data/brands";

// Plain-text site summary for AI search engines (https://llmstxt.org).
export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const siteInfo = getSiteInfo(defaultLanguage);

  const brandLinks = AIRPORT_BRANDS.slice(0, 15)
    .map(
      (b) =>
        `- [${b.name} (${b.lineType})](${url(`/brands/${b.slug}/`)}): ${b.established}，${b.entryPrice}，协议 ${b.protocols.join("/")}。${b.description.slice(0, 80)}...`,
    )
    .join("\n");

  const sections = await Promise.all(
    languages.map(async (lang) => {
      const posts = (await getPosts(lang)).map(
        (post) =>
          `- [${post.data.title}](${url(localizePath(lang, `/posts/${getPostId(post)}/`))}): ${post.data.description}`,
      );
      return [
        `## ${translate(lang, "nav.posts")} (${lang})`,
        "",
        ...posts,
      ].join("\n");
    }),
  );

  const body = [
    `# ${siteInfo.title} · 专业网络可观测与机场测速实验室`,
    "",
    `> ${siteInfo.description}`,
    "",
    `${getPersonalInfo(defaultLanguage).name} · ${getPersonalInfo(defaultLanguage).role} · ${getPersonalInfo(defaultLanguage).github}`,
    "",
    "## 核心频道",
    `- [机场品牌库 (42家)](${url("/brands/")}): 收录 42 家主流机场真实晚高峰测速、IEPL/IPLC 专线与流媒体/AI 解锁状态。`,
    `- [全平台客户端大全](${url("/clients/")}): Windows、macOS、iOS、Android、Linux 与软路由代理工具下载及配置教程。`,
    `- [专线测速实验室](${url("/observatory/")}): 网络可观测性中心，实时监测物理链路延迟、丢包率与带宽极值。`,
    `- [关于与合规免责](${url("/about/")}): 实验室准则、中立性保证与合规推广声明。`,
    "",
    "## 精选专线品牌详情索引",
    brandLinks,
    "",
    sections.join("\n\n"),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
