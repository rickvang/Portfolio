create type public.post_status as enum ('draft', 'published', 'archived');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null default '',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_published_at_check check (
    status <> 'published' or published_at is not null
  )
);

create index posts_published_at_idx
  on public.posts (published_at desc)
  where status = 'published';

alter table public.posts enable row level security;

grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

create policy "Published posts are publicly readable"
  on public.posts
  for select
  to anon, authenticated
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );

create policy "Authors can read their posts"
  on public.posts
  for select
  to authenticated
  using ((select auth.uid()) = author_id);

create policy "Authors can create their posts"
  on public.posts
  for insert
  to authenticated
  with check ((select auth.uid()) = author_id);

create policy "Authors can update their posts"
  on public.posts
  for update
  to authenticated
  using ((select auth.uid()) = author_id)
  with check ((select auth.uid()) = author_id);

create policy "Authors can delete their posts"
  on public.posts
  for delete
  to authenticated
  using ((select auth.uid()) = author_id);

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at
before update on public.posts
for each row
execute function private.set_updated_at();
