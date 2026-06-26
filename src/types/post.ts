export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  category: string | null
  tags: string[]
  read_minutes: number | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}
