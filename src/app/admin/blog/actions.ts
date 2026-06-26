"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Post } from "@/types/post"

function computeReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export type PostInput = {
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image_url: string
  category: string
  tags: string[]
  published: boolean
}

export async function createPost(
  input: PostInput
): Promise<{ id: string } | { error: string }> {
  const supabase = await createAdminClient()
  const read_minutes = computeReadMinutes(input.content)
  const published_at = input.published ? new Date().toISOString() : null

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...input, read_minutes, published_at })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath("/blog")
  if (input.published) revalidatePath(`/blog/${input.slug}`)

  return { id: data.id }
}

export async function updatePost(
  id: string,
  input: Partial<PostInput>,
  wasPublished: boolean
): Promise<{ post: Post } | { error: string }> {
  const supabase = await createAdminClient()

  const updates: Record<string, unknown> = { ...input }

  if (input.content !== undefined) {
    updates.read_minutes = computeReadMinutes(input.content)
  }

  if (input.published && !wasPublished) {
    updates.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath("/blog")
  revalidatePath(`/blog/${data.slug}`)

  return { post: data as Post }
}

export async function deletePost(id: string, slug: string): Promise<void> {
  const supabase = await createAdminClient()
  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  redirect("/admin/blog")
}

export async function togglePublished(
  id: string,
  slug: string,
  currentlyPublished: boolean
): Promise<void> {
  const supabase = await createAdminClient()
  const updates: Record<string, unknown> = { published: !currentlyPublished }
  if (!currentlyPublished) updates.published_at = new Date().toISOString()

  await supabase.from("posts").update(updates).eq("id", id)

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
}
