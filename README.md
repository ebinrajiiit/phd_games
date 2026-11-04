# Augmented, Not Automated — classroom games

Three phone games for the PhD Research Methodology session on AI tools at IIIT Kottayam.
Static pages. Only a player's nickname and score are sent to the room screen.

Fonts are self-hosted from `fonts/` (Public Sans and Source Serif 4, both under the SIL Open Font License).

| Game | File | What it does |
| --- | --- | --- |
| Reference Hunt | `reference-hunt.html` | Ten references, some real and some hallucinated; 15 seconds each. |
| Human or Machine? | `human-or-machine.html` | Guess whether a paper-introduction paragraph was written by a researcher or an LLM. |
| Prompt Duel | `prompt-duel.html` | Rebuild a weak prompt with RTAFCE; a live meter scores it. |

Live at <https://ebinrajiiit.github.io/phd_games/>

## Room screen

`results.html` is the projector view: live player count, room average, score histogram, top-5 leaderboard (nicknames only), and a per-question breakdown you reveal when everyone has finished. Prompt Duel shows the top six prompts for a vote. It refreshes every 3 seconds.

Open it as `results.html?game=ref`, `?game=hom` or `?game=duel`. It is not linked from the menu, so players don't stumble on the answers.

## Host setup

1. **Supabase (once):** in your Supabase project, open *SQL Editor*, paste `supabase.sql`, and run it. It creates one `plays` table that players can add to and read, but never change or delete.
2. **Keys:** in `config.js`, set `SUPABASE_URL` (Project Settings → API) and `SUPABASE_KEY` (the *publishable* or *anon public* key — never the secret/service_role key). Set `SESSION` to a test value, play once, check `results.html`, then change `SESSION` for the real class so the screen starts empty.
3. **After class:** run `delete from public.plays where session = '<your session>';` in the SQL Editor if you want to clear the data.

The games still work without Supabase; they just don't report to the room screen.

### Game content

- **Human or Machine?** — add four human-written paragraphs (from papers written before November 2022) in the `HOST SETUP` block at the top of `human-or-machine.html`.
- **Prompt Duel** — optionally paste an open-text poll link into `SUBMIT_URL` at the top of `prompt-duel.html`, so teams can submit their prompts for a vote.
