/* Shared helpers for sending and reading game results (Supabase REST). */
(function () {
  const cfg = window.GAME_CONFIG || {};
  const ready = !!(cfg.SUPABASE_URL && cfg.SUPABASE_KEY);

  function headers(extra) {
    const h = Object.assign({ apikey: cfg.SUPABASE_KEY }, extra || {});
    // Legacy anon keys are JWTs and also go in Authorization;
    // new publishable keys (sb_publishable_...) go in apikey only.
    if (!String(cfg.SUPABASE_KEY).startsWith("sb_")) h.Authorization = "Bearer " + cfg.SUPABASE_KEY;
    return h;
  }
  function base() { return cfg.SUPABASE_URL.replace(/\/+$/, "") + "/rest/v1/plays"; }

  async function send(row) {
    if (!ready) return { ok: false, reason: "not-configured" };
    const body = Object.assign({ session: cfg.SESSION || "default" }, row);
    try {
      const r = await fetch(base(), {
        method: "POST",
        headers: headers({ "Content-Type": "application/json", Prefer: "return=minimal" }),
        body: JSON.stringify(body)
      });
      return { ok: r.ok, reason: r.ok ? "" : "http-" + r.status };
    } catch (e) { return { ok: false, reason: "network" }; }
  }

  async function fetchGame(game, session) {
    const q = "?select=nickname,score,total,answers,prompt,weak_prompt,created_at" +
      "&session=eq." + encodeURIComponent(session || cfg.SESSION || "default") +
      "&game=eq." + encodeURIComponent(game) +
      "&order=created_at.desc&limit=2000";
    const r = await fetch(base() + q, { headers: headers() });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }

  const A = ["Curious", "Bold", "Quiet", "Rapid", "Patient", "Lucky", "Sharp", "Stochastic", "Greedy", "Robust", "Sparse", "Convex"];
  const N = ["Gradient", "Tensor", "Reviewer", "Neuron", "Kernel", "Baseline", "Encoder", "Sampler", "Scholar", "Optimizer", "Token", "Shapley"];
  function randomNick() {
    return A[Math.floor(Math.random() * A.length)] + " " + N[Math.floor(Math.random() * N.length)] + " " + (10 + Math.floor(Math.random() * 90));
  }
  function cleanNick(s) { s = String(s || "").replace(/\s+/g, " ").trim().slice(0, 30); return s || randomNick(); }

  window.Results = { ready, send, fetchGame, randomNick, cleanNick, session: cfg.SESSION || "default" };
})();
