const posts = [
    {
        slug: "hong-kong-exchange",
        title: "My Exchange Semester in Hong Kong",
        excerpt: "Exploring the vibrant city, its tech scene, and studying at CityU.",
        category: "Travel",
        date: "2026-01-10",
    },
    {
        slug: "building-llm-agents",
        title: "Building LLM Agents with LangGraph",
        excerpt: "A deep dive into creating modular AI workflows using LangGraph.",
        category: "Tech",
        date: "2025-12-15",
    },
    {
        slug: "ankara-streets",
        title: "Street Photography in Ankara",
        excerpt: "Capturing the essence of my hometown through my lens.",
        category: "Photos",
        date: "2025-11-20",
    },
];

export async function GET() {
    const baseUrl = "https://asyaunal.com";

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Asya Unal's Blog</title>
    <link>${baseUrl}</link>
    <description>Thoughts on travel, tech, and photography</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <category>${post.category}</category>
    </item>`).join("")}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
