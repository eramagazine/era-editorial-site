-- Run once in the project's Supabase SQL Editor. Task text stays in the repository.
-- Visitors may read completion and update only the done column; never create/delete tasks.
create table if not exists public.era_task_completion (
  id text primary key,
  done boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.era_task_completion enable row level security;
revoke all on public.era_task_completion from anon, authenticated;
grant select on public.era_task_completion to anon, authenticated;
grant update (done) on public.era_task_completion to anon, authenticated;
drop policy if exists era_tasks_read on public.era_task_completion;
create policy era_tasks_read on public.era_task_completion for select to anon, authenticated using (true);
drop policy if exists era_tasks_mark on public.era_task_completion;
create policy era_tasks_mark on public.era_task_completion for update to anon, authenticated using (true) with check (true);
create or replace function public.era_tasks_set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists era_tasks_updated_at on public.era_task_completion;
create trigger era_tasks_updated_at before update on public.era_task_completion
for each row execute function public.era_tasks_set_updated_at();
insert into public.era_task_completion (id,done) values
 ('hook-2026-10-19',false),('backup-team-2026-10-19',false),
 ('heroes-2026-10-20',true),('rubrics-2026-10-20',true),
 ('design-2026-10-20',false),('logo-2026-11-02',false),
 ('finance-2026-11-03',false),('research-2026-11-03',false)
on conflict (id) do nothing;
