import { createClient } from './client'

export async function uploadBlogImage(file: File): Promise<string> {
  const supabase = createClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
  return data.publicUrl
}
