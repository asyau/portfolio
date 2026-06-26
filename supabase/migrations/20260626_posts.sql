-- Run this in the Supabase SQL editor for your project

create table if not exists posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  excerpt          text,
  content          text not null,                   -- markdown
  cover_image_url  text,
  category         text,
  tags             text[] default '{}',
  read_minutes     int,
  published        boolean default false,
  published_at     timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on posts
  for each row execute procedure update_updated_at();

-- RLS
alter table posts enable row level security;

-- Public can read published posts
create policy "public read published"
  on posts for select
  using (published = true);

-- Admin can read all (including drafts)
create policy "admin read all"
  on posts for select
  to authenticated
  using (auth.email() = 'asyaunal02@gmail.com');

-- Admin can insert / update / delete
create policy "admin insert"
  on posts for insert
  to authenticated
  with check (auth.email() = 'asyaunal02@gmail.com');

create policy "admin update"
  on posts for update
  to authenticated
  using (auth.email() = 'asyaunal02@gmail.com');

create policy "admin delete"
  on posts for delete
  to authenticated
  using (auth.email() = 'asyaunal02@gmail.com');

-- Storage bucket for blog images
-- Create this bucket in Supabase Dashboard → Storage → New bucket
-- Name: blog-images, Public: true
-- Then add this storage policy via the dashboard or SQL:

insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
  on conflict do nothing;

create policy "public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "admin upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and auth.email() = 'asyaunal02@gmail.com');

create policy "admin delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and auth.email() = 'asyaunal02@gmail.com');
