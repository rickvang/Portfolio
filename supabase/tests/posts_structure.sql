begin;

select plan(6);

select has_table('public', 'posts', 'posts table exists');
select has_column('public', 'posts', 'author_id', 'posts has an author column');
select has_column('public', 'posts', 'published_at', 'posts has a publication timestamp');

select is(
  (
    select relrowsecurity::text
    from pg_class
    where oid = 'public.posts'::regclass
  ),
  't',
  'posts has row level security enabled'
);

select results_eq(
  $$
    select count(*)::int
    from pg_policies
    where schemaname = 'public' and tablename = 'posts'
  $$,
  $$values (5)$$,
  'posts has five ownership and publication policies'
);

select results_eq(
  $$
    select count(*)::int
    from public.posts
    where status = 'published' and published_at is not null
  $$,
  $$values (1)$$,
  'seed data contains one published fixture'
);

select * from finish();

rollback;
