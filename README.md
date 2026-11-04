# Augmented, Not Automated — classroom games

Three phone games for the PhD Research Methodology session on AI tools at IIIT Kottayam.
Static pages: nothing a player types leaves their phone.

| Game | File | What it does |
| --- | --- | --- |
| Reference Hunt | `reference-hunt.html` | Ten references, some real and some hallucinated; 15 seconds each. |
| Human or Machine? | `human-or-machine.html` | Guess whether a paper-introduction paragraph was written by a researcher or an LLM. |
| Prompt Duel | `prompt-duel.html` | Rebuild a weak prompt with RTAFCE; a live meter scores it. |

Live at <https://ebinrajiiit.github.io/phd_games/>

## Host setup

- **Human or Machine?** — add four human-written paragraphs (from papers written before November 2022) in the `HOST SETUP` block at the top of `human-or-machine.html`.
- **Prompt Duel** — optionally paste an open-text poll link into `SUBMIT_URL` at the top of `prompt-duel.html`, so teams can submit their prompts for a vote.
