insert into public.posts (
  slug,
  title,
  excerpt,
  content,
  status,
  published_at
)
values (
  'fixture-post',
  'Fixture post',
  'A local-only post used to verify the posts schema.',
  'Replace this fixture with approved content before production use.',
  'published',
  now()
)
on conflict (slug) do nothing;
