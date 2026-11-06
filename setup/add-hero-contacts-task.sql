insert into public.era_task_completion (id, done)
values ('hero-contacts-2026-11-04', false)
on conflict (id) do nothing;
