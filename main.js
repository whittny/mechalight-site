const $ = (s) => document.querySelector(s);

(function initYear() {
  const year = new Date().getFullYear();
  const el = $("#year");
  if (el) el.textContent = year;
})();

let lang = "ko";
const dict = {
  ko: {
    kicker: "초고차원 리듬 기반 크리에이티브 유니버스",
    subtitle: "Rhythm-Driven Cinema & AI Creation",
    lead: "음악(EDM) · 메타휴먼 · 언리얼 시네마틱 · AI 워크플로우를 하나의 “공명 시스템”으로 통합합니다.",
    ctaWorks: "작업 보기",
    ctaContact: "협업 문의",
    stat1: "Resonance Framework",
    stat2: "MetaHuman / Sequencer",
    stat3: "Music · Image · Video",
    cardText: "“리듬은 감각을 통해 사고를 우회하고, 세계를 재배치한다.”",
    pulseBtn: "PULSE",
    mini1t: "Music", mini1d: "Hypnotic EDM / Cyber-Trance",
    mini2t: "Cinema", mini2d: "UE Sequencer / Lumen / Nanite",
    mini3t: "MetaHuman", mini3d: "Conform / Mesh Transfer / Rig",
    mini4t: "AI", mini4d: "Suno · Kling · ComfyUI",
    universeTitle: "Universe",
    universeDesc: "MECHA-LIGHT는 “대자비심 → 대지혜 → 대광명”의 흐름을 리듬/영상/캐릭터/기술로 번역합니다. 인간의 한계를 넘어서는 것이 아니라, 안정적으로 확장되는 공명(Resonance)을 설계합니다.",
    u1t: "Rhythm as Protocol", u1d: "감정과 동작을 동기화하는 리듬 구조를 설계합니다.",
    u2t: "Cinematic Presence", u2d: "빛/재질/카메라/연출을 “몰입 장치”로 통합합니다.",
    u3t: "Safe Infinite Resonance", u3d: "안정성(rollback/제어)을 포함한 확장 철학(vΩ)을 적용합니다.",
    worksTitle: "Works",
    worksHint: "리듬으로 형상화된 흔적들을 이곳에 모읍니다.",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "Contact",
    contactDesc: "협업, 제작, 기술 파이프라인 정리 관련 문의는 아래를 통해 연락해 주세요.",
    msgPH: "메시지를 입력해 주세요.",
    openEmailBtn: "이메일 열기",
    copyBtn: "메시지 복사",
    contactNote: "* “이메일 열기”는 사용자의 메일 앱을 여는 기능이며, 이 사이트가 메일을 직접 발송하지 않습니다.",
    footerNote: "Cloudflare Pages 기반 리듬-드리븐 정적 사이트",
    worksLoadFail: "Works 데이터를 불러오지 못했습니다. (콘솔을 확인해 주세요)",
    contactEmail: "contact@mechalight.co.kr"
  },
  en: {
    kicker: "Ultra-dimensional rhythm-driven creative universe",
    subtitle: "Rhythm-Driven Cinema & AI Creation",
    lead: "Music (EDM), MetaHuman, Unreal cinematic pipelines, and AI workflows—unified as one resonance system.",
    ctaWorks: "View Works",
    ctaContact: "Contact",
    stat1: "Resonance Framework",
    stat2: "MetaHuman / Sequencer",
    stat3: "Music · Image · Video",
    cardText: "“Rhythm bypasses thought through sensation—and rearranges the world.”",
    pulseBtn: "PULSE",
    mini1t: "Music", mini1d: "Hypnotic EDM / Cyber-Trance",
    mini2t: "Cinema", mini2d: "UE Sequencer / Lumen / Nanite",
    mini3t: "MetaHuman", mini3d: "Conform / Mesh Transfer / Rig",
    mini4t: "AI", mini4d: "Suno · Kling · ComfyUI",
    universeTitle: "Universe",
    universeDesc: "MECHA-LIGHT translates the flow of compassion → wisdom → illumination into rhythm, cinema, characters, and technology. Not escaping limits—designing safe, expanding resonance.",
    u1t: "Rhythm as Protocol", u1d: "We design rhythmic structures that synchronize emotion and motion.",
    u2t: "Cinematic Presence", u2d: "Light, materials, camera, and direction become one immersion device.",
    u3t: "Safe Infinite Resonance", u3d: "We apply an expansion philosophy (vΩ) with stability and rollback control.",
    worksTitle: "Works",
    worksHint: "A curated trace of outputs—shaped by rhythm.",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "Contact",
    contactDesc: "For collaboration, production, or pipeline consulting—reach out below.",
    msgPH: "Write your message here.",
    openEmailBtn: "Open Email",
    copyBtn: "Copy Message",
    contactNote: "* “Open Email” launches your mail app. This site does not send emails by itself.",
    footerNote: "A rhythm-driven static site on Cloudflare Pages.",
    worksLoadFail: "Failed to load works. (Check the console)",
    contactEmail: "contact@mechalight.net"
  }
};

function applyLang() {
  console.log("[Debug] applyLang called. Current lang:", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[lang] && dict[lang][key]) el.setAttribute("placeholder", dict[lang][key]);
  });

  // Link & Text for email
  const emailLink = $("#contactEmailLink");
  if (!emailLink) console.warn("[Debug] #contactEmailLink not found in DOM");

  if (emailLink && dict[lang] && dict[lang].contactEmail) {
    const mail = dict[lang].contactEmail;
    console.log("[Debug] Switching email to:", mail);
    emailLink.textContent = mail;
    emailLink.href = "mailto:" + mail;
  }
}

window.addEventListener("DOMContentLoaded", function initLang() {
  const btn = $("#langBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      lang = (lang === "ko") ? "en" : "ko";
      applyLang();
    });
  }
  applyLang();
});

// Contact: copy + mailto open (정적사이트에서 “직접 발송”은 불가)
(function initContact() {
  const form = $("#contactForm");
  const input = $("#msgInput");
  const status = $("#copyStatus");
  const openBtn = $("#openEmailBtn");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      const to = dict[lang]?.contactEmail || "contact@mechalight.co.kr";
      const subject = encodeURIComponent("[MECHA-LIGHT] Contact");
      const msg = (input?.value || "").trim();
      const body = encodeURIComponent(msg || "Hello! I'd like to contact MECHA-LIGHT.");
      // 메일 앱 열기 (브라우저 팝업/기본앱 설정에 따라 동작이 다를 수 있음)
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = (input?.value || "").trim();

      if (!msg) {
        if (status) status.textContent = (lang === "ko") ? "메시지를 입력해 주세요." : "Type a message first.";
        return;
      }

      try {
        await navigator.clipboard.writeText(msg);
        if (status) status.textContent = (lang === "ko") ? "복사 완료 ✅" : "Copied ✅";
      } catch {
        if (status) status.textContent = (lang === "ko") ? "복사 실패(브라우저 권한 확인)" : "Copy failed (check permissions)";
      }
    });
  }
})();

// Interactive card
let locked = true;
const chip = $("#signalChip");
const bar = $("#meterBar");
const statusText = $("#statusText");

function setLocked(v) {
  locked = v;
  if (chip) chip.textContent = locked ? "LOCKED" : "OPEN";
  if (statusText) statusText.textContent = locked ? "PLV ≥ 0.85" : "SYNC: ACTIVE";
  if (bar) bar.style.width = locked ? "42%" : "78%";
}
setLocked(true);

$("#pulseBtn")?.addEventListener("click", () => {
  setLocked(!locked);
  pulseBurst();
});

// Background pulse canvas
const canvas = $("#pulse");
const ctx = canvas ? canvas.getContext("2d") : null;

function resize() {
  if (!canvas || !ctx) return;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

let t = 0;
const ripples = [];

function pulseBurst() {
  ripples.push({
    x: window.innerWidth * (0.55 + (Math.random() - 0.5) * 0.25),
    y: window.innerHeight * (0.25 + (Math.random() - 0.5) * 0.18),
    r: 0,
    a: 0.55
  });
  if (ripples.length > 10) ripples.shift();
}

function draw() {
  if (!ctx) return;
  t += 0.01;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // soft drifting lines
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 16; i++) {
    const y = (i / 16) * window.innerHeight;
    const sway = Math.sin(t * 1.2 + i) * 18 + Math.sin(t * 0.7 + i * 2) * 12;
    ctx.beginPath();
    ctx.moveTo(0, y + sway);
    ctx.lineTo(window.innerWidth, y - sway);
    ctx.strokeStyle = "rgba(150,180,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ripples
  ctx.globalAlpha = 1;
  for (const rp of ripples) {
    rp.r += 5.2;
    rp.a *= 0.985;
    const a = Math.max(0, rp.a);

    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,42,109,${0.35 * a})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r * 0.65, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(122,92,255,${0.28 * a})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // cleanup
  for (let i = ripples.length - 1; i >= 0; i--) {
    if (ripples[i].a < 0.03) ripples.splice(i, 1);
  }

  requestAnimationFrame(draw);
}
draw();

// auto pulse occasionally
setInterval(() => { if (!document.hidden) pulseBurst(); }, 2200);

// Works: JSON 로딩 후 카드 렌더
async function loadWorks() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  try {
    const res = await fetch("./data/works.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`works.json HTTP ${res.status}`);
    const works = await res.json();

    if (!Array.isArray(works) || works.length === 0) {
      grid.innerHTML = `<div class="mono subtle">—</div>`;
      return;
    }

    grid.innerHTML = works.map(w => `
      <a class="work" href="${w.url || '#'}" target="_blank" rel="noopener">
        <div class="work-tag">${w.type || 'WORK'}</div>
        <div class="work-title">${w.title || ''}</div>
        <div class="work-sub">${w.subtitle || ''}</div>
      </a>
    `).join("");

  } catch (e) {
    console.error("Failed to load works.json", e);
    const msg = dict[lang]?.worksLoadFail || "Failed to load works.";
    grid.innerHTML = `<div class="mono subtle">${msg}</div>`;
  }
}

window.addEventListener("DOMContentLoaded", loadWorks);
