-- Register shared completion for the two new tasks; preserve existing marks.
insert into public.era_task_completion (id, done)
values
  ('smm-reels-2026-10-09', false),
  ('local-scene-research-2026-10-09', false)
on conflict (id) do nothing;
