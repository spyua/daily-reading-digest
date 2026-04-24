import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/config';

const TITLE = 'Daily Reading Digest';
const DESC = '個人閱讀文章的結構化分析留存';

export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/posts/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${escapeXml(p.topic)}</category>
      ${p.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
      <description><![CDATA[${p.summary ?? ''}]]></description>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DESC)}</description>
    <language>zh-Hant</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
