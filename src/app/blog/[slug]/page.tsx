import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { createClient } from "@/lib/supabase/server"
import { ReadingProgress } from "@/components/reading-progress"
import type { Post } from "@/types/post"

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {}

  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!data) return {}
  return { title: data.title, description: data.excerpt }
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []

  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true)

  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) notFound()

  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!data) notFound()
  const post = data as Post

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <article>
            <header className="mb-12">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                {post.category && (
                  <span className="px-2 py-0.5 bg-accent-brand/10 text-accent-brand rounded text-xs font-medium">
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at ?? post.created_at).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </span>
                {post.read_minutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.read_minutes} min read
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {post.cover_image_url && (
              <div className="mb-12 rounded-2xl overflow-hidden aspect-[16/9] bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
