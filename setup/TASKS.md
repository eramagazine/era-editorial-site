# Shared task completion

1. Create a Supabase project at https://supabase.com/dashboard (choose region and a database password in the dashboard; do not send the password in chat).
2. In SQL Editor run `setup/supabase-tasks.sql`. It seeds the eight task IDs without overwriting existing marks.
3. In project API settings copy the Project URL and public Publishable key. Put them in `assets/tasks-config.js` as `url` and `publishableKey`, keeping `mode: "supabase"`. These two values are public client configuration. Never use a secret or service_role key.
4. Serve the site and verify two separate browsers see the same completion after refresh/polling. Test a failed write too; the checkbox must roll back.
5. Publish after validation. GitHub Pages serves static task content; Supabase stores only marks. Completion refreshes every 10 seconds while visible and on returning to the page.

Visitors have no task editor. Database grants permit SELECT and UPDATE(done), not INSERT, DELETE or UPDATE(id). Task text and dates are in `assets/tasks-data.js` and change through repository edits. When adding a task, add its stable ID to the database with an owner-run INSERT; never grant visitor INSERT. Screenshot rows without a task title are intentionally excluded.

Any visitor can mark/unmark a task, as requested; there is no account-based attribution. All team members share the same marks. Do not use a local fallback on network failure: show the error and keep the last confirmed value.
