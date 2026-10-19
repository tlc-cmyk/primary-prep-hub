/* 小學備試 hub — render game cards from games.json */
(function () {
  const root = document.getElementById("games");
  if (!root) return;

  function card(g, i) {
    const el = document.createElement("article");
    el.className = "game-card";
    el.setAttribute("role", "listitem");
    el.style.setProperty("--card-accent", g.accent || "#7c5cff");
    el.style.animationDelay = `${0.05 + i * 0.07}s`;

    const emoji = escapeHtml(g.emoji || "🎮");
    const name = escapeHtml(g.name || "未命名遊戲");
    const desc = escapeHtml(g.description || "");
    const url = sanitizeUrl(g.url);

    el.innerHTML =
      `<div class="game-top">` +
        `<div class="game-emoji" aria-hidden="true">${emoji}</div>` +
        `<div class="game-meta">` +
          `<h2 class="game-name">${name}</h2>` +
          `<p class="game-desc">${desc}</p>` +
        `</div>` +
      `</div>` +
      (url
        ? `<a class="play-btn" href="${url}" rel="noopener">開始玩 <span class="arrow" aria-hidden="true">›</span></a>`
        : `<span class="play-btn" style="opacity:0.5;pointer-events:none">即將推出</span>`);

    return el;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sanitizeUrl(u) {
    if (!u || typeof u !== "string") return "";
    try {
      const parsed = new URL(u, location.href);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        return parsed.href;
      }
    } catch (_) { /* ignore */ }
    return "";
  }

  function render(list) {
    root.textContent = "";
    if (!Array.isArray(list) || list.length === 0) {
      root.innerHTML = `<p class="empty">暫時未有遊戲 · 請稍後再嚟</p>`;
      return;
    }
    list.forEach((g, i) => root.appendChild(card(g, i)));
  }

  fetch("games.json", { cache: "no-cache" })
    .then((r) => {
      if (!r.ok) throw new Error("load failed");
      return r.json();
    })
    .then(render)
    .catch(() => {
      // Fallback inline list if games.json fails (e.g. file://)
      render([
        {
          id: "iphone-addition-blocks",
          name: "加數積木星星",
          description: "數字積木加法 · 學習區 · 賽車衝線",
          url: "https://tlc-cmyk.github.io/iphone-addition-blocks/",
          emoji: "🧱",
          accent: "#7c5cff"
        },
        {
          id: "flappy-addition",
          name: "加數小鳥",
          description: "飛過正確答案嘅管子空隙",
          url: "https://tlc-cmyk.github.io/flappy-addition/",
          emoji: "🐦",
          accent: "#5B9BD5"
        }
      ]);
    });
})();
