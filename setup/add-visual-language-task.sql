-- Add the new task without changing any existing completion marks.
insert into public.era_task_completion (id, done)
values ('visual-language-2026-11-04', false)
on conflict (id) do nothing;
