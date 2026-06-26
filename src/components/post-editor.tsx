"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Eye, Edit2, Upload, Loader2, Trash2 } from "lucide-react"
import { createPost, updatePost, deletePost } from "@/app/admin/blog/actions"
import { uploadBlogImage } from "@/lib/supabase/upload"
import type { Post } from "@/types/post"
import type { PostInput } from "@/app/admin/blog/actions"

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function computeReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const CATEGORIES = ["Travel", "Tech", "Photos", "Life", "Music"]

interface PostEditorProps {
  post?: Post
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [tab, setTab] = useState<"write" | "preview">("write")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [slugManual, setSlugManual] = useState(!!post?.slug)

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [category, setCategory] = useState(post?.category ?? "")
  const [tags, setTags] = useState((post?.tags ?? []).join(", "))
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const [published, setPublished] = useState(post?.published ?? false)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManual) setSlug(slugify(value))
  }

  function handleSlugChange(value: string) {
    setSlug(value)
    setSlugManual(true)
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    try {
      const url = await uploadBlogImage(file)
      setCoverUrl(url)
    } catch (e) {
      setError(String(e))
    } finally {
      setUploading(false)
    }
  }

  const buildInput = useCallback((): PostInput => ({
    slug: slug || slugify(title),
    title,
    excerpt,
    content,
    cover_image_url: coverUrl,
    category,
    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    published,
  }), [slug, title, excerpt, content, coverUrl, category, tags, published])

  async function handleSave() {
    if (!title.trim()) { setError("Title is required"); return }
    if (!content.trim()) { setError("Content is required"); return }
    setSaving(true)
    setError("")

    try {
      const input = buildInput()
      if (post) {
        const result = await updatePost(post.id, input, post.published)
        if ("error" in result) { setError(result.error); return }
      } else {
        const result = await createPost(input)
        if ("error" in result) { setError(result.error); return }
        router.push(`/admin/blog/${result.id}/edit`)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!post) return
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    await deletePost(post.id, post.slug)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-16 z-30 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{title || "Untitled"}</span>
            <span>·</span>
            <span>{computeReadMinutes(content)} min read</span>
            {post && (
              <>
                <span>·</span>
                <span className={published ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
                  {published ? "Published" : "Draft"}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {post && (
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-muted-foreground">Publish</span>
              <button
                role="switch"
                aria-checked={published}
                onClick={() => setPublished(!published)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  published ? "bg-accent-brand" : "bg-border"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                    published ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-brand text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {post ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 pt-4">
          <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg">{error}</p>
        </div>
      )}

      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-8 flex-1 flex flex-col gap-6">
        {/* Metadata fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className="w-full text-2xl font-bold bg-transparent border-b border-border/50 focus:border-foreground pb-2 focus:outline-none transition-colors placeholder:text-muted-foreground/40"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="auto-generated"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Excerpt</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description…"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
            >
              <option value="">No category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, langchain, python"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Cover image</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://… or upload →"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
              />
              <label className="cursor-pointer flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-border/50 hover:border-border transition-colors">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                />
              </label>
            </div>
            {coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt="Cover preview" className="mt-2 h-20 w-full object-cover rounded-lg" />
            )}
          </div>
        </div>

        {/* Write / Preview tabs */}
        <div className="flex-1 flex flex-col border border-border/50 rounded-xl overflow-hidden">
          <div className="flex border-b border-border/40 bg-secondary/30">
            <button
              onClick={() => setTab("write")}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === "write" ? "text-foreground border-b-2 border-accent-brand" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit2 className="h-3.5 w-3.5" />
              Write
            </button>
            <button
              onClick={() => setTab("preview")}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === "preview" ? "text-foreground border-b-2 border-accent-brand" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <div className="ml-auto px-4 py-2.5 text-xs text-muted-foreground">
              {computeReadMinutes(content)} min · {content.trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>

          {tab === "write" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in Markdown…"
              className="flex-1 min-h-[480px] p-6 font-mono text-sm bg-background resize-none focus:outline-none leading-relaxed"
            />
          ) : (
            <div className="flex-1 min-h-[480px] p-6 overflow-auto">
              <div className="markdown-content max-w-3xl mx-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content || "*Nothing to preview yet.*"}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
