// Diagnostic only — remove after confirming env vars work
export function GET() {
  return Response.json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `SET (starts with: ${process.env.NEXT_PUBLIC_SUPABASE_URL.slice(0, 20)}...)`
      : "MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `SET (length: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length})`
      : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? `SET (length: ${process.env.SUPABASE_SERVICE_ROLE_KEY.length})`
      : "MISSING",
  })
}
