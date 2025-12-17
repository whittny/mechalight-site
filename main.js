const $ = (s) => document.querySelector(s);

const year = new Date().getFullYear();
$("#year").textContent = year;

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
    worksHint: "리듬으로 형상화된 세계의 흔적들",
    w1: "YouTube / Hypnotic EDM",
    w2: "YouTube / Dark Electronic",
    w3: "UE5 Cinematic Sequence",
    w4: "Workflow / Notes",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "Contact",
    contactDesc: "협업, 제작, 기술 파이프라인 정리 관련 문의는 아래를 통해 연락해 주세요.",
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
    worksHint: "Traces of worlds shaped by rhythm",
    w1: "YouTube / Hypnotic EDM",
    w2: "YouTube / Dark Electronic",
    w3: "UE5 Cinematic Sequence",
    w4: "Workflow / Notes",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "Contact",
    contactDesc: "For collaboration, production, or pipeline consulting—reach out below.",
  }
};

function applyLang(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[lang][key]) el.textContent = dict[lang][key];
  });
  renderWorks();
}

$("#langBtn").addEventListener("click", ()=>{
  lang = (lang === "ko") ? "en" : "ko";
  applyLang();
});

applyLang();

let worksData = { items: [] };

async function loadWorks(){
  try{
    const res = await fetch("./works.json", { cache: "no-store" });
    if(!res.ok) throw new Error("Failed to load works.json");
    worksData = await res.json();
  }catch(e){
    console.error(e);
    worksData = { items: [] };
  }
  renderWorks();
}

function renderWorks(){
  const grid = document.getElementById("worksGrid");
  if(!grid) return;

  const items = worksData.items || [];
  grid.innerHTML = items.map(item => {
    const subText = item.sub?.[lang] ?? "";
    const href = item.url || "#";
    const target = href.startsWith("#") ? "" : ' target="_blank" rel="noopener"';
    return `
      <a class="work" href="${href}"${target}>
        <div class="work-tag">${item.tag}</div>
        <div class="work-title">${item.title}</div>
        <div class="work-sub">${subText}</div>
      </a>
    `;
  }).join("");
}

// Interactive card
let locked = true;
const chip = $("#signalChip");
const bar = $("#meterBar");
const status = $("#statusText");

function setLocked(v){
  locked = v;
  chip.textContent = locked ? "LOCKED" : "OPEN";
  status.textContent = locked ? "PLV ≥ 0.85" : "SYNC: ACTIVE";
  bar.style.width = locked ? "42%" : "78%";
}
setLocked(true);

$("#pulseBtn").addEventListener("click", ()=>{
  setLocked(!locked);
  pulseBurst();
});

// Background pulse canvas
const canvas = $("#pulse");
const ctx = canvas.getContext("2d");
let W=0, H=0;

function resize(){
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  W = canvas.width = Math.floor(window.innerWidth * dpr);
  H = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resize);
resize();

let t = 0;
const ripples = [];

function pulseBurst(){
  ripples.push({
    x: window.innerWidth * (0.55 + (Math.random()-0.5)*0.25),
    y: window.innerHeight * (0.25 + (Math.random()-0.5)*0.18),
    r: 0,
    a: 0.55
  });
  if(ripples.length > 10) ripples.shift();
}

function draw(){
  t += 0.01;

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  // soft drifting lines
  ctx.globalAlpha = 0.16;
  for(let i=0;i<16;i++){
    const y = (i/16) * window.innerHeight;
    const sway = Math.sin(t*1.2 + i)*18 + Math.sin(t*0.7 + i*2)*12;
    ctx.beginPath();
    ctx.moveTo(0, y + sway);
    ctx.lineTo(window.innerWidth, y - sway);
    ctx.strokeStyle = "rgba(150,180,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ripples
  ctx.globalAlpha = 1;
  for(const rp of ripples){
    rp.r += 5.2;
    rp.a *= 0.985;
    const a = Math.max(0, rp.a);

    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(255,42,109,${0.35*a})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r*0.65, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(122,92,255,${0.28*a})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // cleanup
  for(let i=ripples.length-1;i>=0;i--){
    if(ripples[i].a < 0.03) ripples.splice(i,1);
  }

  requestAnimationFrame(draw);
}
draw();

// auto pulse occasionally
setInterval(()=>{ if(!document.hidden) pulseBurst(); }, 2200);

// ✅ Email 복사 버튼 동작
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy || btn.textContent.trim();
    const statusEl = document.getElementById("copyStatus");
    try {
      await navigator.clipboard.writeText(text);
      if (statusEl) statusEl.textContent = (lang === "ko")
        ? "이메일 주소가 복사되었습니다 ✅"
        : "Email copied ✅";
    } catch {
      if (statusEl) statusEl.textContent = (lang === "ko")
        ? "복사 실패 (브라우저 권한 확인)"
        : "Copy failed (check permissions)";
    }
  });
});



