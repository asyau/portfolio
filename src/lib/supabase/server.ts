import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      `Supabase env vars missing on server.\n` +
      `NEXT_PUBLIC_SUPABASE_URL: ${url ? '✓' : '✗ MISSING'}\n` +
      `NEXT_PUBLIC_SUPABASE_ANON_KEY: ${key ? '✓' : '✗ MISSING'}\n` +
      `Run: rm -rf .next && npm run dev`
    )
  }
  const cookieStore = await cookies()
  return createServerClient(url, key,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // read-only context (e.g. inside a Server Component render)
          }
        },
      },
    }
  )
}

// Service-role client — bypasses RLS; only use in server actions / admin routes
export async function createAdminClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )
}
