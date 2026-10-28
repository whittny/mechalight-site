/**
 * MECHA LIGHT
 * Stable Baseline Version
 * Verified & Locked
 * Date: 2025-12-18
 *
 * NOTE:
 * This file represents the last known stable state
 * before MECHA LIGHT vΩ development.
 */

const $ = (s) => document.querySelector(s);

(function initYear() {
  const year = new Date().getFullYear();
  const el = $("#year");
  if (el) el.textContent = year;
})();

let lang = "ko";
try {
  const saved = localStorage.getItem("ml_lang");
  if (saved === "ko" || saved === "en") lang = saved;
} catch {}

const dict = {
  ko: {
    soundInviteTitle: "이 장면은 어떻게 들릴까요?",
    soundInviteDesc: "엔진의 울림부터 타이어가 노면을 스치는 순간까지. 헤드폰을 쓰고 공간 속으로 들어와 보세요.",

    flagshipStatement: "움직임을 읽고. 소리의 공간을 설계하다.",
    flagshipMotion: "영상 속 움직임",
    flagshipFriction: "속도별 타이어 마찰음",
    flagshipSpatial: "방향과 거리의 입체 음향",

    driveLabTitle: "주행의 움직임을 소리의 공간으로.",
    driveVisualOnly: "개념 시각화 · 실제 음원 분석값 아님",
    driveCruise: "정속 주행",
    driveAccelerate: "가속",
    driveCorner: "코너링",
    driveLabCaption: "모드를 바꾸면 속도와 마찰, 소리의 좌우 이동을 시각적으로 탐색할 수 있습니다. 실제 차량 사운드와 입체 음향은 위 영상에서 소리를 켜고 감상해 주세요.",

    kicker: "AI와 감각이 공명하는 사이버펑크 유니버스",
    subtitle: "Rhythm-Driven Cinema & AI Creation",
    lead: "메카닉의 정밀함, 사이버펑크의 에너지. 음악 · 메타휴먼 · 시네마틱 · AI를 하나의 공명 시스템으로 연결합니다.",
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
    v2aVideoTitle: "속도를 소리로, 주행을 공간으로.",
    v2aVideoDesc: "영상 속 차량의 주행 사운드와 바퀴·노면 사이의 마찰음을 속도 변화에 맞춰 적용한 입체 음향 시연입니다. 차량의 움직임에 따라 달라지는 소리의 방향과 거리감으로 주행 현장의 공간감을 표현합니다.",
    v2aVideoHint: "소리를 켜고 헤드폰으로 감상해 보세요. 속도에 따라 달라지는 주행음과 타이어 마찰음의 입체감을 느낄 수 있습니다. (자동 재생은 음소거로 시작합니다.)",
    v2aVideoLink: "YouTube에서 보기 ↗",
    v2aTitle: "V2A 연구개발",
    v2aLead: "소리가 없는 영상을 보고, 화면 속 사건에 맞는 효과음과 배경음을 프레임 단위로 만들어 내는 Video-to-Audio 모델을 개발하고 있습니다.",
    v2aStatus: "진행 중: 학습 데이터 정제와 모델 설계",
    v2aEv0: "문 닫힘", v2aEv1: "발걸음", v2aEv2: "컵 내려놓기", v2aEv3: "빗소리",
    v2aCaption: "영상 속 사건이 일어나는 프레임에 맞춰 소리를 만듭니다. 위 화면은 개념을 보여주는 예시입니다.",
    v2aReplay: "다시 재생",
    v2aHowTitle: "작동 방식",
    v2aP1t: "영상 이해", v2aP1d: "비디오 인코더가 프레임마다 장면, 동작, 물체를 읽어냅니다.",
    v2aP2t: "타이밍 맞춤과 생성", v2aP2d: "프레임 단위 정렬 모듈이 사건 시점을 잡고, Flow Matching 기반 생성 모델이 소리를 만듭니다. 텍스트로 소리의 느낌을 조절할 수도 있습니다.",
    v2aP3t: "48kHz 오디오 출력", v2aP3d: "편집에 바로 쓸 수 있는 고음질 효과음과 배경음을 내보냅니다.",
    v2aRoadTitle: "개발 로드맵",
    v2aR1t: "데이터 정제", v2aR1d: "공개 영상-오디오 데이터에서 화면과 소리가 맞지 않는 샘플을 걸러내고 특징을 추출합니다.",
    v2aR2t: "대규모 학습", v2aR2d: "영상, 텍스트, 오디오를 함께 학습하는 멀티노드 분산학습을 진행합니다.",
    v2aR3t: "평가와 최적화", v2aR3d: "공개 벤치마크에서 기존 공개 모델과 비교하고 생성 속도를 높입니다.",
    v2aR4t: "시험 공개", v2aR4d: "크리에이터와 제작사가 써 볼 수 있는 API 형태의 시험 버전을 준비합니다.",
    v2aEvalTitle: "성능을 재는 기준",
    v2aE1t: "음질", v2aE1d: "FD, KL 지표로 실제 소리와 얼마나 비슷한지 측정",
    v2aE2t: "영상과의 일치", v2aE2d: "ImageBind score로 화면 내용과 소리가 맞는지 측정",
    v2aE3t: "타이밍", v2aE3d: "DeSync로 소리가 사건 시점에서 얼마나 어긋나는지 측정",
    v2aE4t: "비교 대상", v2aE4d: "VGGSound 테스트셋에서 MMAudio 등 공개 모델과 비교",
    v2aUseTitle: "이런 곳에 씁니다",
    v2aU1: "1인 크리에이터의 숏폼 효과음 작업", v2aU2: "게임 컷신과 시네마틱의 사운드 초안", v2aU3: "소리 없이 생성된 AI 영상의 후처리",
    v2aNote: "학습과 평가에는 공개 연구 데이터셋 VGGSound(CC BY 4.0, Chen et al., ICASSP 2020)를 출처를 밝혀 연구 목적으로 사용합니다.",
    universeTitle: "Universe",
    universeDesc: "MECHA LIGHT는 “대자비심 → 대지혜 → 대광명”의 흐름을 리듬/영상/캐릭터/기술로 번역합니다. 인간의 한계를 넘어서는 것이 아니라, 안정적으로 확장되는 공명(Resonance)을 설계합니다.",
    u1t: "Rhythm as Protocol", u1d: "감정과 동작을 동기화하는 리듬 구조를 설계합니다.",
    u2t: "Cinematic Presence", u2d: "빛/재질/카메라/연출을 “몰입 장치”로 통합합니다.",
    u3t: "Safe Infinite Resonance", u3d: "안정성(rollback/제어)을 포함한 확장 철학(vΩ)을 적용합니다.",
    worksTitle: "Selected works",
    worksHint: "조회수가 높은 작품부터 만나보세요.",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "ESTABLISH CONTACT",
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
    soundInviteTitle: "What does this scene sound like?",
    soundInviteDesc: "From the engine’s growl to tires meeting the road. Put on headphones and step inside the soundscape.",

    flagshipStatement: "Read the motion. Shape the soundscape.",
    flagshipMotion: "Motion in the frame",
    flagshipFriction: "Speed-dependent tire friction",
    flagshipSpatial: "Direction, distance, spatial sound",

    driveLabTitle: "Motion becomes a soundscape.",
    driveVisualOnly: "Concept visualization · not measured audio data",
    driveCruise: "Cruise",
    driveAccelerate: "Accelerate",
    driveCorner: "Cornering",
    driveLabCaption: "Switch modes to explore speed, friction, and spatial movement visually. Enable sound in the video above to hear the actual vehicle and spatial audio.",

    kicker: "MECHANICAL PRECISION. HUMAN RESONANCE.",
    subtitle: "Rhythm-Driven Cinema & AI Creation",
    lead: "Mechanical precision. Cyberpunk energy. Music, MetaHuman, cinema, and AI connected as one resonance system.",
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
    v2aVideoTitle: "Speed becomes sound. Motion becomes space.",
    v2aVideoDesc: "A spatial audio demonstration pairing the vehicle footage with driving sounds and tire-to-road friction that change with speed. Shifts in sound direction and perceived distance follow the vehicle’s movement to convey the space of the drive.",
    v2aVideoHint: "Enable sound and listen with headphones to experience driving sounds and tire friction that change with speed in spatial audio. Autoplay starts muted.",
    v2aVideoLink: "Watch on YouTube ↗",
    v2aTitle: "V2A Research",
    v2aLead: "We are building a Video-to-Audio model that watches silent footage and generates sound effects and ambience matched to on-screen events, frame by frame.",
    v2aStatus: "In progress: training data curation and model design",
    v2aEv0: "Door shuts", v2aEv1: "Footstep", v2aEv2: "Cup set down", v2aEv3: "Rain",
    v2aCaption: "Sound is generated on the frames where events happen. The strip above is an illustrative example.",
    v2aReplay: "Play again",
    v2aHowTitle: "How it works",
    v2aP1t: "Understand the video", v2aP1d: "A video encoder reads the scene, motion, and objects in every frame.",
    v2aP2t: "Align and generate", v2aP2d: "A frame-level alignment module locates each event, and a Flow Matching generator creates the sound. Text prompts can steer its character.",
    v2aP3t: "48kHz audio out", v2aP3d: "High-fidelity effects and ambience, ready to drop into an edit.",
    v2aRoadTitle: "Roadmap",
    v2aR1t: "Data curation", v2aR1d: "Filter out public video-audio samples where picture and sound do not match, then extract features.",
    v2aR2t: "Large-scale training", v2aR2d: "Multi-node distributed training on video, text, and audio together.",
    v2aR3t: "Evaluation and tuning", v2aR3d: "Benchmark against public models and speed up generation.",
    v2aR4t: "Trial release", v2aR4d: "Prepare a trial API for creators and studios.",
    v2aEvalTitle: "How we measure it",
    v2aE1t: "Audio quality", v2aE1d: "FD and KL measure how close the result is to real sound",
    v2aE2t: "Match to video", v2aE2d: "ImageBind score checks that the sound fits what is on screen",
    v2aE3t: "Timing", v2aE3d: "DeSync measures how far sound drifts from each event",
    v2aE4t: "Baseline", v2aE4d: "Compared with public models such as MMAudio on the VGGSound test set",
    v2aUseTitle: "Where it helps",
    v2aU1: "Sound effects for creators’ short-form videos", v2aU2: "Draft sound for game cutscenes and cinematics", v2aU3: "Post-production for silent AI-generated video",
    v2aNote: "Training and evaluation use the public research dataset VGGSound (CC BY 4.0, Chen et al., ICASSP 2020), credited and used for research.",
    universeTitle: "Universe",
    universeDesc: "MECHA LIGHT translates the flow of compassion → wisdom → illumination into rhythm, cinema, characters, and technology. Not escaping limits—designing safe, expanding resonance.",
    u1t: "Rhythm as Protocol", u1d: "We design rhythmic structures that synchronize emotion and motion.",
    u2t: "Cinematic Presence", u2d: "Light, materials, camera, and direction become one immersion device.",
    u3t: "Safe Infinite Resonance", u3d: "We apply an expansion philosophy (vΩ) with stability and rollback control.",
    worksTitle: "Selected works",
    worksHint: "Explore the most-viewed works first.",
    techTitle: "Tech Stack",
    t1t: "Real-time",
    t2t: "Audio",
    t3t: "AI",
    contactTitle: "ESTABLISH CONTACT",
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
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[lang] && dict[lang][key]) el.setAttribute("placeholder", dict[lang][key]);
  });

  updateArchiveButton();
  const lb = $("#langBtn"); if(lb) lb.textContent = lang === "ko" ? "EN ↗" : "KO ↗";
  // Link & Text for email
  const emailLink = $("#contactEmailLink");

  if (emailLink && dict[lang] && dict[lang].contactEmail) {
    const mail = dict[lang].contactEmail;
    emailLink.textContent = mail;
    emailLink.href = "mailto:" + mail;
  }
}

window.addEventListener("DOMContentLoaded", function initLang() {
  const btn = $("#langBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      lang = (lang === "ko") ? "en" : "ko";
      try { localStorage.setItem("ml_lang", lang); } catch {}
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
      const subject = encodeURIComponent("[MECHA LIGHT] Contact");
      const msg = (input?.value || "").trim();
      const body = encodeURIComponent(msg || "Hello! I'd like to contact MECHA LIGHT.");
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

    grid.replaceChildren();
    works.forEach((w,index) => {
      let url; try { url = new URL(w.url); } catch { return; }
      if (!['https:', 'http:'].includes(url.protocol)) return;
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
      if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
      const card = document.createElement('a'); card.className='work'; card.hidden=index>=6; card.href=url.href;card.target='_blank';card.rel='noopener';
      const visual=document.createElement('div');visual.className='work-visual';
      const img=document.createElement('img');img.src=w.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;img.alt=(w.title||'') + (w.thumbnailKind === 'archive-cover' ? ' — archive cover artwork' : '');img.loading='lazy';img.decoding='async';let fallbackTried = false;
      function recoverThumbnail() {
        if (!fallbackTried) { fallbackTried = true; img.src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`; }
        else { img.remove(); visual.classList.add('thumbnail-unavailable'); }
      }
      img.addEventListener('error', recoverThumbnail);
      img.addEventListener('load', () => { if (img.naturalWidth <= 120) recoverThumbnail(); });visual.append(img);
      const arrow=document.createElement('span');arrow.className='work-arrow';arrow.textContent='↗';visual.append(arrow);
      const tag=document.createElement('div');tag.className='work-tag';tag.textContent=w.type||'WORK';
      const title=document.createElement('h3');title.className='work-title';title.textContent=w.title||'';
      const sub=document.createElement('p');sub.className='work-sub';sub.textContent=(w.subtitle||'').replace('YouTube / MECHA LIGHT / ','');
      card.append(visual,tag,title,sub);grid.append(card);
    }); updateArchiveButton();

  } catch (e) {
    console.error("Failed to load works.json", e);
    const msg = dict[lang]?.worksLoadFail || "Failed to load works.";
    grid.innerHTML = `<div class="mono subtle">${msg}</div>`;
  }
}

window.addEventListener("DOMContentLoaded", loadWorks);

let archiveExpanded=false;
function updateArchiveButton(){const b=document.getElementById('archiveBtn');const n=document.querySelectorAll('#workGrid .work').length;if(!b)return;b.hidden=n<=6;b.setAttribute('aria-expanded',String(archiveExpanded));b.textContent=archiveExpanded?(lang==='ko'?'간략히 보기 −':'Show less −'):(lang==='ko'?`전체 작품 보기 (${n}) ↗`:`Explore all works (${n}) ↗`);}
document.getElementById('archiveBtn')?.addEventListener('click',()=>{archiveExpanded=!archiveExpanded;document.querySelectorAll('#workGrid .work').forEach((c,i)=>c.hidden=!archiveExpanded&&i>=6);updateArchiveButton();if(!archiveExpanded)document.getElementById('works').scrollIntoView({behavior:'instant'});});
const menuToggle=document.getElementById('menuToggle');menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));document.getElementById('mainNav').classList.toggle('is-open',open);});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>{menuToggle?.setAttribute('aria-expanded','false');document.getElementById('mainNav').classList.remove('is-open');}));

// Kinetic interface. One ambient frame loop; suspended when hidden or paused.
(function initKineticInterface() {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const button = document.getElementById('motionToggle');
  const reactor = document.querySelector('.reactor');
  const drive = document.getElementById('overdriveBtn');
  const field = document.getElementById('energyField');
  const context = field?.getContext('2d');
  let paused = reduce.matches;
  let boosted = false;
  let frame = 0;
  let width = 0, height = 0, last = 0;
  let particles = [];
  const pointer = { x: 0.5, y: 0.5 };

  function sizeField() {
    if (!field || !context) return;
    width = window.innerWidth; height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    field.width = Math.round(width * dpr); field.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({length: width < 700 ? 24 : 56}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3, speed: Math.random() * 0.45 + 0.15
    }));
  }
  function paint(time) {
    if (paused || document.hidden || !context) { frame = 0; return; }
    const dt = Math.min(2, (time - (last || time)) / 16.67); last = time;
    context.clearRect(0, 0, width, height);
    const speed = boosted ? 4 : 1;
    for (const p of particles) {
      p.y -= p.speed * dt * speed;
      if (p.y < -4) p.y = height + 4;
      const dx = (pointer.x - 0.5) * p.radius * 12;
      context.beginPath(); context.arc(p.x + dx, p.y, p.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(88,220,255,0.45)'; context.fill();
      if (boosted) {
        context.beginPath(); context.moveTo(p.x + dx, p.y); context.lineTo(p.x + dx, p.y + p.speed * 18);
        context.strokeStyle = 'rgba(88,220,255,0.18)'; context.stroke();
      }
    }
    frame = requestAnimationFrame(paint);
  }
  function syncMotion() {
    root.classList.toggle('motion-paused', paused || document.hidden);
    if (button) {
      button.textContent = paused ? 'MOTION / OFF' : 'MOTION / ON';
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? 'Resume visual motion' : 'Pause visual motion');
    }
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (!paused && !document.hidden && context) frame = requestAnimationFrame(paint);
  }
  button?.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduce.addEventListener('change', () => { paused = reduce.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  drive?.addEventListener('click', () => {
    boosted = !boosted; root.classList.toggle('overdrive', boosted);
    drive.setAttribute('aria-pressed', String(boosted));
    drive.textContent = boosted ? 'NORMAL MODE ↙' : 'OVERDRIVE ↗';
    const status = document.getElementById('coreStatus');
    if (status) status.textContent = boosted ? '● OVERDRIVE' : '● ONLINE';
  });
  reactor?.addEventListener('pointermove', event => {
    if (paused || reduce.matches || !finePointer.matches) return;
    const rect = reactor.getBoundingClientRect();
    reactor.style.setProperty('--rx', `${-((event.clientY - rect.top) / rect.height - 0.5) * 12}deg`);
    reactor.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 16}deg`);
  });
  reactor?.addEventListener('pointerleave', () => {
    reactor.style.setProperty('--rx', '0deg'); reactor.style.setProperty('--ry', '0deg');
  });
  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = event.clientY / window.innerHeight;
  }, {passive: true});
  let scrollQueued = false;
  function updateScroll() {
    const distance = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--scroll', distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }, {passive: true});
  window.addEventListener('resize', () => { sizeField(); updateScroll(); }, {passive: true});
  if ('IntersectionObserver' in window && !reduce.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
      });
    }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
    root.classList.add('motion-ready');
    document.querySelectorAll('.section').forEach(section => {
      if (section.getBoundingClientRect().top > window.innerHeight) section.classList.add('is-pending');
      observer.observe(section);
    });
  }
  sizeField(); updateScroll(); syncMotion();
})();

// Official IFrame API connects the invitation button to the actual audio state.
(function initV2AFeaturedVideo() {
  const iframe = document.getElementById('v2aFeaturedPlayer');
  const button = document.getElementById('v2aSoundToggle');
  const label = document.getElementById('v2aSoundLabel');
  const feedback = document.getElementById('v2aSoundFeedback');
  if (!iframe || !button) return;
  let player = null, ready = false, started = false, timer = 0, failed = false;
  const english = () => document.documentElement.lang === 'en';
  function sync() {
    if (!ready) {
      label.textContent = failed ? (english() ? 'Use player sound control ↓' : '영상에서 소리를 켜 주세요 ↓') : (english() ? 'Connecting player…' : '플레이어 연결 중…');
      return;
    }
    const audible = !player.isMuted() && player.getVolume() > 0;
    button.setAttribute('aria-pressed', String(audible));
    button.classList.toggle('sound-active', audible);
    label.textContent = audible ? (english() ? 'Sound on · Mute' : '소리 켜짐 · 음소거') : (english() ? 'Enable spatial sound ↗' : '입체 음향 켜기 ↗');
    button.setAttribute('aria-label', audible ? (english() ? 'Mute video sound' : '영상 소리 끄기') : (english() ? 'Enable video spatial sound' : '영상 입체 음향 켜기'));
  }
  function connect() {
    if (!window.YT?.Player || player) return;
    player = new window.YT.Player(iframe, {events: {
      onReady(event) { ready = true; button.disabled = false; event.target.mute(); event.target.playVideo(); sync(); timer = window.setInterval(() => { if (!document.hidden) sync(); }, 800); },
      onStateChange() { sync(); },
      onError() { ready = false; failed = true; button.disabled = true; feedback.textContent = english() ? 'Open the video on YouTube if playback is unavailable.' : '재생이 안 되면 아래 YouTube 링크에서 감상해 주세요.'; sync(); }
    }});
  }
  function loadPlayer() {
    if (started) return; started = true;
    const url = new URL(iframe.dataset.src);
    url.searchParams.set('enablejsapi', '1'); url.searchParams.set('origin', window.location.origin);
    iframe.src = url.href;
    if (window.YT?.Player) connect();
    else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (typeof previous === 'function') previous(); connect(); };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script'); script.src = 'https://www.youtube.com/iframe_api'; script.async = true;
        script.onerror = () => { failed = true; sync(); };
        document.head.append(script);
      }
    }
    window.setTimeout(() => { if (!ready) { failed = true; sync(); } }, 12000);
  }
  button.addEventListener('click', () => {
    if (!ready) return;
    if (player.isMuted() || player.getVolume() === 0) { player.setVolume(70); player.unMute(); player.playVideo(); }
    else player.mute();
    sync();
  });
  new MutationObserver(sync).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  window.addEventListener('pagehide', () => window.clearInterval(timer), {once:true});
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { loadPlayer(); observer.disconnect(); } }, {threshold:0.15});
    observer.observe(iframe);
  } else loadPlayer();
})();

// Driving scene: illustrative motion, not analysis of the embedded soundtrack.
(function initDrivingLab() {
  const canvas = document.getElementById('driveCanvas');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const lab = document.getElementById('driveLab');
  const car = document.getElementById('driveCar');
  const speedText = document.getElementById('driveSpeed');
  const dot = document.getElementById('spatialDot');
  const pause = document.getElementById('drivePause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let mode = 'cruise', speed = 80, phase = 0, last = 0, raf = 0;
  let width = 0, height = 0, visible = false, userPaused = reduced.matches;
  const bars = ['engineBars','tireBars'].map(id => {
    const parent = document.getElementById(id);
    return Array.from({length:48}, () => { const bar=document.createElement('i');parent.append(bar);return bar; });
  });
  const modes = {cruise:{speed:80,friction:.25},accelerate:{speed:180,friction:.65},corner:{speed:110,friction:1}};
  function draw(dt) {
    phase += dt * (speed / 80);
    speed += (modes[mode].speed - speed) * Math.min(1,dt * 1.6);
    speedText.textContent = String(Math.round(speed));
    const turn = mode === 'corner' ? Math.sin(phase*.6)*.65 : Math.sin(phase*.25)*.06;
    const cx = width * (.5 + turn*.1), horizon = height*.30;
    context.clearRect(0,0,width,height);
    const sky=context.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#050c18');sky.addColorStop(.4,'#112d43');sky.addColorStop(1,'#030912');context.fillStyle=sky;context.fillRect(0,0,width,height);
    // Distant city silhouettes, with restrained window lights.
    for(let i=0;i<28;i++){
      const x=i*width/27, bh=15+((i*37)%71);context.fillStyle=i%2?'#091b2c':'#0c2236';context.fillRect(x,horizon-bh,width/24,bh);
      context.fillStyle='#58cfff33';for(let y=horizon-bh+7;y<horizon-5;y+=10)context.fillRect(x+5,y,2,3);
    }
    const glow=context.createRadialGradient(cx,horizon,0,cx,horizon,width*.4);glow.addColorStop(0,'#45cbff20');glow.addColorStop(1,'#45cbff00');context.fillStyle=glow;context.fillRect(0,0,width,height);
    context.beginPath();context.moveTo(cx-12,horizon);context.lineTo(cx+12,horizon);context.lineTo(width*1.13,height);context.lineTo(-width*.13,height);context.closePath();context.fillStyle='#07101a';context.fill();
    // Perspective road surface and lane markers move towards the viewer.
    for(let i=0;i<19;i++){
      const z=((i/19+phase*.16)%1), perspective=z*z, y=horizon+perspective*(height-horizon), spread=perspective*width*.65;
      context.strokeStyle=`rgba(66,136,175,${.03+z*.13})`;context.beginPath();context.moveTo(cx-spread,y);context.lineTo(cx+spread,y);context.stroke();
      for(const side of [-1,1]){
        const lx=cx+side*spread*.36;context.strokeStyle=`rgba(145,214,239,${z*.5})`;context.lineWidth=1+z*2;
        context.beginPath();context.moveTo(lx,y);context.lineTo(lx+side*(2+z*4),y+3+z*18);context.stroke();
      }
    }
    for(const side of [-1,1]){
      context.beginPath();context.moveTo(cx+side*15,horizon);context.lineTo(width*.5+side*width*.65,height);context.strokeStyle='#3de8ff66';context.lineWidth=2;context.stroke();
      for(let i=0;i<15;i++){
        const z=((i/15+phase*.16)%1);const y=horizon+z*z*(height-horizon);const x=cx+side*z*z*width*.66;
        context.fillStyle=side<0?'#56dfff':'#ff5477';context.fillRect(x,y,2+z*3,3+z*14);
      }
    }
    // Sound propagation rings and tire friction streaks around the vehicle.
    const carY=height*.72;
    for(let i=0;i<4;i++){
      const r=((phase*.35+i/4)%1);context.beginPath();context.ellipse(cx,carY,30+r*width*.32,10+r*height*.16,0,0,Math.PI*2);context.strokeStyle=`rgba(72,219,255,${(1-r)*.24})`;context.lineWidth=1;context.stroke();
    }
    for(const side of [-1,1]){
      const tireX=width*.5+turn*width*.045+side*width*.105;
      const trail=context.createLinearGradient(0,carY,0,height);trail.addColorStop(0,`rgba(255,65,104,${modes[mode].friction*.5})`);trail.addColorStop(1,'rgba(255,65,104,0)');context.strokeStyle=trail;context.lineWidth=mode==='corner'?9:4;
      context.beginPath();context.moveTo(tireX,carY);context.quadraticCurveTo(tireX-turn*width*.08,height*.88,tireX-turn*width*.15,height);context.stroke();
    }
    car.style.transform=`translate(calc(-50% + ${turn*width*.045}px),calc(-15% + ${Math.sin(phase*9)*Math.min(1.4,speed/100)}px)) rotate(${turn*4}deg)`;
    dot.style.left=(50+turn*65)+'%';
    bars.forEach((row,channel)=>row.forEach((bar,i)=>{
      const wave=Math.abs(Math.sin(i*.7+phase*(channel?9:4))*Math.cos(i*.29-phase*2));
      const power=channel?modes[mode].friction:speed/200;
      bar.style.height=(8+wave*(25+power*65))+'%';bar.style.opacity=String(.35+wave*.6);
    }));
  }
  function tick(now){if(!visible||userPaused||document.hidden||reduced.matches){raf=0;return;}const dt=Math.min(.05,(now-(last||now))/1000);last=now;draw(dt);raf=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(raf);raf=0;last=0;pause.textContent=userPaused?'PLAY ▷':'PAUSE Ⅱ';pause.setAttribute('aria-pressed',String(userPaused));if(visible&&!userPaused&&!document.hidden&&!reduced.matches)raf=requestAnimationFrame(tick);else draw(0);}
  function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);draw(0);}
  document.querySelectorAll('[data-drive]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.drive;document.querySelectorAll('[data-drive]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));if(userPaused||reduced.matches){speed=modes[mode].speed;draw(0);}}));
  pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{userPaused=reduced.matches;sync();});
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(lab);}else visible=true;
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
  resize();sync();
})();

// Reuse the live WebGL scene in a slim identity strip after the hero leaves view.
(function initHeroDock(){
  const hero=document.querySelector('.hero-cockpit');
  const reactor=hero?.querySelector('.reactor');
  const dock=document.getElementById('heroDock');
  const slot=document.getElementById('dockVisual');
  const header=document.querySelector('.header');
  if(!hero||!reactor||!dock||!slot)return;
  const anchor=document.createElement('div');
  anchor.className='reactor-anchor';
  anchor.style.cssText='position:absolute;left:0;top:0;width:100%;height:1px;pointer-events:none;opacity:0;';
  reactor.before(anchor);
  // Match the CSS breakpoint; innerWidth grows with the layout viewport on some mobile browsers.
  const mobileQuery=matchMedia('(max-width:700px)');
  let docked=false,queued=false;
  function rememberOriginalScene(){
    const rect=reactor.getBoundingClientRect();
    const scene=reactor.querySelector('.hud-scene');
    const sceneRect=scene?.getBoundingClientRect();
    if(!sceneRect||sceneRect.width<1||sceneRect.height<1)return;
    dock.style.setProperty('--original-hud-width',scene.clientWidth+'px');
    dock.style.setProperty('--original-hud-height',scene.clientHeight+'px');
    dock.style.setProperty('--original-hud-x',rect.left+'px');
    // Keep the original large disc centered behind the narrow viewing window.
    dock.style.setProperty('--original-hud-top',(38-scene.clientHeight*.5)+'px');
  }
  function update(){
    queued=false;
    const headerHeight=header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--dock-header-height',headerHeight+'px');
    const isMobile=mobileQuery.matches;
    const heroRect=hero.getBoundingClientRect();
    const next=isMobile
      ?(docked?(window.scrollY>=170||heroRect.top<=-30):(window.scrollY>=220||heroRect.top<=-80))
      :(docked?(heroRect.bottom<=headerHeight+48):(heroRect.bottom<=headerHeight+24));
    if(!docked)rememberOriginalScene();
    if(next===docked)return;
    docked=next;
    if(docked){slot.append(reactor);dock.inert=false;}
    else{anchor.after(reactor);dock.inert=true;}
    document.documentElement.classList.toggle('hero-is-docked',docked);
    window.dispatchEvent(new Event('resize'));
  }
  function queue(){if(!queued){queued=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  update();
})();
