-- ============================================================
--  Results table for the classroom games.
--  Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
--  Players (anonymous, using the publishable/anon key) may only
--  INSERT a result and SELECT results. They cannot change or delete
--  anything. You clear old data from the dashboard, or simply use a
--  new SESSION value in config.js for each class.
-- ============================================================

create table if not exists public.plays (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  session     text not null check (char_length(session) between 1 and 40),
  game        text not null check (game in ('ref', 'hom', 'duel')),
  nickname    text not null check (char_length(nickname) between 1 and 30),
  score       integer not null check (score between 0 and 100),
  total       integer not null check (total between 1 and 100),
  answers     jsonb,              -- per-question results: [{id, label, truth, correct}]
  prompt      text check (prompt is null or char_length(prompt) <= 4000),  -- Prompt Duel only
  weak_prompt text check (weak_prompt is null or char_length(weak_prompt) <= 120)
);

create index if not exists plays_session_game_idx on public.plays (session, game, created_at desc);

alter table public.plays enable row level security;

drop policy if exists "players can submit results" on public.plays;
create policy "players can submit results"
  on public.plays for insert
  to anon
  with check (true);

drop policy if exists "anyone can read results" on public.plays;
create policy "anyone can read results"
  on public.plays for select
  to anon
  using (true);

-- Table privileges for the anonymous role: read and insert only.
revoke all on public.plays from anon;
grant select, insert on public.plays to anon;

-- To clear a session after class (run as you, in the SQL Editor):
--   delete from public.plays where session = 'rm-2026-11';
