import { createClient } from "@/lib/supabase/server"
import { BlogList } from "@/components/blog-list"
import type { Post } from "@/types/post"

export const revalidate = 3600

export const metadata = {
  title: "Blog",
  description: "Thoughts on travel, tech, and photography",
}

export default async function Blog() {
  let posts: Post[] = []

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
      posts = (data ?? []) as Post[]
    } catch (e) {
      console.error("[blog] Supabase fetch failed:", e)
    }
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <BlogList posts={posts} />
    </div>
  )
}
