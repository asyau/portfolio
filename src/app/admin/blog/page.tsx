import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/server"
import { PenSquare, Plus, Calendar, Clock, Eye, EyeOff } from "lucide-react"
import type { Post } from "@/types/post"
import { togglePublished } from "./actions"

export const dynamic = "force-dynamic"

export default async function AdminBlogList() {
  const supabase = await createAdminClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  const all = (posts ?? []) as Post[]
  const drafts = all.filter((p) => !p.published)
  const published = all.filter((p) => p.published)

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {all.length} total · {published.length} published · {drafts.length} draft
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-brand text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      {all.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-4">
          <PenSquare className="h-12 w-12 text-border" strokeWidth={1} />
          <p>No posts yet. Create your first one.</p>
          <Link
            href="/admin/blog/new"
            className="text-sm text-accent-brand font-medium hover:opacity-75 transition-opacity"
          >
            Write a post →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {all.map((post) => (
            <div
              key={post.id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-border transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      post.published
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  {post.category && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-accent-brand/10 text-accent-brand font-medium">
                      {post.category}
                    </span>
                  )}
                </div>
                <h2 className="font-medium truncate">{post.title}</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {post.read_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.read_minutes} min
                    </span>
                  )}
                  <span className="font-mono text-border">/{post.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <form
                  action={async () => {
                    "use server"
                    await togglePublished(post.id, post.slug, post.published)
                  }}
                >
                  <button
                    type="submit"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {post.published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </form>
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
