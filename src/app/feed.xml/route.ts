import { createClient } from "@/lib/supabase/server"
import type { Post } from "@/types/post"

export const revalidate = 3600

export async function GET() {
  const baseUrl = "https://asyaunal.com"
  let posts: Post[] = []

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient()
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(20)
    posts = (data ?? []) as Post[]
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Asya Unal's Blog</title>
    <link>${baseUrl}</link>
    <description>Thoughts on travel, tech, and photography</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.excerpt ?? ""}</description>
      <pubDate>${new Date(post.published_at ?? post.created_at).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      ${post.category ? `<category>${post.category}</category>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { "Content-Type": "application/xml" },
  })
}
