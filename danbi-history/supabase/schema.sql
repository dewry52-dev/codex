-- Self-reported practice records, not verified assessment scores.
create table public.learning_runs (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('solo','class')),
  coins integer not null check (coins between 0 and 500),
  solved integer not null check (solved between 0 and 5),
  first_try integer not null check (first_try between 0 and solved),
  completed boolean not null default false,
  elapsed_seconds integer not null check (elapsed_seconds between 0 and 86400),
  created_at timestamptz not null default now(),
  check (not completed or solved = 5)
);
create index learning_runs_owner_created on public.learning_runs(user_id,created_at desc);
alter table public.learning_runs enable row level security;
revoke all on public.learning_runs from anon, authenticated;
grant select,insert,update on public.learning_runs to authenticated;
create policy own_runs_read on public.learning_runs for select to authenticated using ((select auth.uid())=user_id);
create policy own_runs_create on public.learning_runs for insert to authenticated with check ((select auth.uid())=user_id);
create policy own_runs_update on public.learning_runs for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
