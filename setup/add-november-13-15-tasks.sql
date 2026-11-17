-- Add shared completion for seven new tasks without changing existing marks.
insert into public.era_task_completion (id, done)
values
  ('journal-hero-outreach-2026-11-13', false),
  ('photographer-review-2026-11-13', false),
  ('backstage-events-2026-11-13', false),
  ('wednesday-format-2026-11-13', false),
  ('reels-final-format-2026-11-13', false),
  ('smm-heroes-2026-11-13', false),
  ('branding-curator-review-2026-11-15', false)
on conflict (id) do nothing;
