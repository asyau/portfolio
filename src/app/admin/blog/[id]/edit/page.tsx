import { notFound } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/server"
import { PostEditor } from "@/components/post-editor"
import type { Post } from "@/types/post"

export const metadata = { title: "Edit Post · Admin" }

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createAdminClient()
  const { data } = await supabase.from("posts").select("*").eq("id", id).single()

  if (!data) notFound()

  return <PostEditor post={data as Post} />
}
