const clients = {
  talha: {
    name: "Talha Reviews",
    handle: "@talha__reviews",
    avatar: "assets/clients/talha-reviews/profile/avatar-full.jpg",
    quote: "A long-term creator partnership built around pacing, motion and edits that hold attention.",
    role: "Video editing · Motion graphics",
    stat: "Selected edits",
    assets: "Short form · YouTube",
    copy: "Creator partnership across short- and long-form content, built for attention and consistent publishing.",
    social: "https://instagram.com/talha__reviews"
  },
  rehan: {
    name: "Rehan Scales",
    handle: "@rehanscales",
    avatar: "assets/clients/rehan-scales/profile/avatar-full.jpg",
    quote: "Sharp founder content designed to turn expertise into a strong personal brand.",
    role: "Short form · Long form",
    stat: "Agency scaling",
    assets: "Reels · YouTube · Thumbnails",
    copy: "Founder-led edits that keep the message clear, fast and native to each platform.",
    social: "https://instagram.com/rehanscales"
  },
  falex: {
    name: "Mr Falex",
    handle: "@mrfalex_",
    avatar: "assets/clients/mr-falex/profile/avatar-full.jpg",
    quote: "Cinematic documentary energy, compressed into short-form stories with a point of view.",
    role: "Documentary · Short form",
    stat: "Selected edits",
    assets: "Documentary reel",
    copy: "Documentary-minded editing with cinematic pacing, texture and character-led storytelling.",
    social: "https://instagram.com/mrfalex_"
  },
  fahad: {
    name: "Fahad Films",
    handle: "@fahadfilms.official",
    avatar: "assets/clients/fahad-films/profile/avatar-full.jpg",
    quote: "Story-led production edits shaped for entertainment, clarity and repeat viewing.",
    role: "Production · Commercial reels",
    stat: "Production reels",
    assets: "2 production reels",
    copy: "An emerging video production company with 1,000+ ad films in its showcase.",
    social: "https://instagram.com/fahadfilms.official"
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const skillSection = $(".skills");
const root = document.documentElement;
const siteHeader = $('.site-header');
const menuToggle = $('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const open = siteHeader.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = open ? 'Close' : 'Menu';
});
$$('.site-header nav a').forEach((link) => link.addEventListener('click', () => {
  siteHeader.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  if (menuToggle) menuToggle.textContent = 'Menu';
}));
const aboutSection = $('.about');
const aboutCanvas = $('#aboutCanvas');
const aboutContext = aboutCanvas?.getContext('2d');
const aboutFrameCount = Number(aboutSection?.dataset.frameCount || 0);
// Keep the scroll sequence out of the initial network waterfall. Frames are
// requested in a small window around the current scroll position.
const aboutFrames = Array.from({ length: aboutFrameCount }, () => null);
let activeAboutFrame = 0;
function loadAboutFrame(index) {
  if (index < 0 || index >= aboutFrameCount) return null;
  if (aboutFrames[index]) return aboutFrames[index];
  const frame = new Image();
  frame.decoding = 'async';
  frame.src = `assets/about-sequence/frame-${String(index).padStart(3, '0')}.jpg`;
  frame.addEventListener('load', () => {
    if (index === activeAboutFrame) drawAboutFrame(index);
  }, { once: true });
  aboutFrames[index] = frame;
  return frame;
}
function warmAboutWindow(index) {
  for (let offset = -3; offset <= 3; offset += 1) loadAboutFrame(index + offset);
}

function drawAboutFrame(index = activeAboutFrame) {
  const frame = aboutFrames[index];
  if (!aboutContext || !frame?.complete || !frame.naturalWidth) return;
  const canvasWidth = aboutCanvas.width;
  const canvasHeight = aboutCanvas.height;
  const scale = Math.max(canvasWidth / frame.naturalWidth, canvasHeight / frame.naturalHeight);
  const width = frame.naturalWidth * scale;
  const height = frame.naturalHeight * scale;
  aboutContext.clearRect(0, 0, canvasWidth, canvasHeight);
  aboutContext.drawImage(frame, (canvasWidth - width) / 2, (canvasHeight - height) / 2, width, height);
}

function resizeAboutCanvas() {
  if (!aboutCanvas) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  aboutCanvas.width = Math.round(window.innerWidth * ratio);
  aboutCanvas.height = Math.round(window.innerHeight * ratio);
  drawAboutFrame();
}

function updateAboutSequence() {
  if (!aboutSection || !aboutFrameCount) return;
  const rect = aboutSection.getBoundingClientRect();
  const scrollable = Math.max(aboutSection.offsetHeight - window.innerHeight, 1);
  const progress = reducedMotion ? 0 : Math.max(0, Math.min(1, -rect.top / scrollable));
  const nextFrame = Math.round(progress * (aboutFrameCount - 1));
  if (nextFrame !== activeAboutFrame) activeAboutFrame = nextFrame;
  warmAboutWindow(activeAboutFrame);
  if (aboutFrames[activeAboutFrame]?.complete) drawAboutFrame(activeAboutFrame);
  updateAboutReview(progress);
}

const aboutReviewOrder = ['talha', 'rehan', 'falex', 'fahad'];
let activeAboutReview = -1;
function updateAboutReview(scrollProgress) {
  const next = Math.min(aboutReviewOrder.length - 1, Math.floor(scrollProgress * aboutReviewOrder.length));
  const meter = $('#aboutReviewProgress');
  if (meter) meter.style.transform = `scaleX(${Math.max(.01, scrollProgress) * 4})`;
  if (next === activeAboutReview) return;
  activeAboutReview = next;
  const client = clients[aboutReviewOrder[next]];
  const panel = $('#aboutReview');
  if (!client || !panel) return;
  panel.classList.add('is-changing');
  window.setTimeout(() => {
    $('#aboutReviewAvatar').src = client.avatar;
    $('#aboutReviewName').textContent = client.name;
    $('#aboutReviewHandle').textContent = client.handle;
    $('#aboutReviewQuote').textContent = client.quote;
    panel.classList.remove('is-changing');
  }, reducedMotion ? 0 : 160);
}

loadAboutFrame(0)?.addEventListener('load', () => { resizeAboutCanvas(); drawAboutFrame(0); }, { once: true });
window.addEventListener('resize', resizeAboutCanvas, { passive: true });

function updateScrollEffects() {
  siteHeader?.classList.toggle('is-compact', window.scrollY > 90);

  if (!reducedMotion && skillSection) {
    const rect = skillSection.getBoundingClientRect();
    const total = skillSection.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
    root.style.setProperty("--skill-progress", progress.toFixed(3));
    $$('.skill-card').forEach((card) => {
      const fall = Number.parseFloat(card.style.getPropertyValue('--fall')) || 0;
      const turn = Number.parseFloat(card.style.getPropertyValue('--r')) || 0;
      card.style.setProperty('--fall-y', `${(progress * fall).toFixed(1)}px`);
      card.style.setProperty('--fall-r', `${(progress * turn).toFixed(2)}deg`);
    });
  }

  $$('[data-parallax]').forEach((node) => {
    if (reducedMotion) return;
    const speed = Number(node.dataset.parallax || 0);
    const y = window.scrollY * speed;
    node.style.translate = `0 ${y}px`;
  });

  updateAboutSequence();
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateScrollEffects(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
resizeAboutCanvas();
updateScrollEffects();

const mediaObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const video = entry.target;
    video.preload = 'metadata';
    video.load();
    mediaObserver.unobserve(video);
  });
}, { rootMargin: '700px 0px' });
$$('video').forEach((video) => mediaObserver.observe(video));

const toolkit = $('.skills-sticky');
const skillCards = $$('.skill-card');
toolkit?.addEventListener('pointermove', (event) => {
  if (reducedMotion || event.pointerType === 'touch') return;
  const rect = toolkit.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  skillCards.forEach((card, index) => {
    const depth = 1 + (index % 3) * .28;
    card.style.setProperty('--mouse-x', `${(x * 24 * depth).toFixed(1)}px`);
    card.style.setProperty('--mouse-y', `${(y * 19 * depth).toFixed(1)}px`);
    card.style.setProperty('--mouse-r', `${(x * (index % 2 ? -3 : 3)).toFixed(2)}deg`);
  });
});
toolkit?.addEventListener('pointerleave', () => skillCards.forEach((card) => {
  card.style.setProperty('--mouse-x', '0px');
  card.style.setProperty('--mouse-y', '0px');
  card.style.setProperty('--mouse-r', '0deg');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.13, rootMargin: "0px 0px -5%" });
$$('.reveal-left, .reveal-right, .reveal-up').forEach((el) => revealObserver.observe(el));

const rowObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = $$('.compare-row').indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.max(0, index) * 70);
    }
  });
}, { threshold: .45 });
$$('.compare-row').forEach((row) => rowObserver.observe(row));

const toast = $('#reviewToast');
let activeClient = 'talha';
let toastTimer;

function selectClient(id) {
  const client = clients[id];
  if (!client) return;
  activeClient = id;
  $$('.client-avatar').forEach((el) => el.classList.toggle('is-active', el.dataset.client === id));
  $('#reviewAvatar').src = client.avatar;
  $('#reviewName').textContent = client.name;
  $('#reviewHandle').textContent = client.handle;
  $('#reviewQuote').textContent = client.quote;
  $('#reviewRole').textContent = client.role;
  $('#reviewStat').textContent = client.stat;
  toast.textContent = `${client.name} selected`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

$$('.client-avatar').forEach((button) => button.addEventListener('click', (event) => {
  selectClient(button.dataset.client);
}));

const metricNodes = $$('.animated-count');
let metricFrame = 0;
function animateMetrics() {
  cancelAnimationFrame(metricFrame);
  if (reducedMotion) {
    metricNodes.forEach((node) => { node.textContent = `${node.dataset.target}${node.dataset.suffix}`; });
    return;
  }
  const started = performance.now();
  const duration = 1500;
  function tick(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    metricNodes.forEach((node) => {
      const target = Number(node.dataset.target);
      node.textContent = `${Math.round(target * eased)}${node.dataset.suffix}`;
    });
    if (progress < 1) metricFrame = requestAnimationFrame(tick);
  }
  metricFrame = requestAnimationFrame(tick);
}
const metricSection = $('.community-metrics');
if (metricSection && 'IntersectionObserver' in window) {
  const metricObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) animateMetrics();
  }, { threshold: .35 });
  metricObserver.observe(metricSection);
}

const clientNotesRail = $('#clientNotes');
if (clientNotesRail) {
  requestAnimationFrame(() => {
    const card = clientNotesRail.querySelector('article');
    clientNotesRail.scrollLeft = (card?.getBoundingClientRect().width || 0) + 18;
  });
}
function moveClientNotes(direction) {
  if (!clientNotesRail) return;
  const card = clientNotesRail.querySelector('article');
  const amount = (card?.getBoundingClientRect().width || 340) + 18;
  clientNotesRail.scrollBy({ left: amount * direction, behavior: reducedMotion ? 'instant' : 'smooth' });
}
$('#notesPrev')?.addEventListener('click', () => moveClientNotes(-1));
$('#notesNext')?.addEventListener('click', () => moveClientNotes(1));

const dialog = $('#clientDialog');
$('#openClient').addEventListener('click', () => {
  const client = clients[activeClient];
  $('#dialogAvatar').src = client.avatar;
  $('#dialogName').textContent = client.name;
  $('#dialogHandle').textContent = client.handle;
  $('#dialogCopy').textContent = client.copy;
  $('#dialogStat').textContent = client.stat;
  $('#dialogAssets').textContent = client.assets;
  $('#dialogSocial').href = client.social;
  dialog.showModal();
});
$('#dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});
$('#dialogWork').addEventListener('click', () => dialog.close());

$$('.youtube-cover').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.video;
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-player';
    const origin = location.protocol === 'https:' || location.protocol === 'http:'
      ? `&origin=${encodeURIComponent(location.origin)}` : '';
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${origin}`;
    iframe.title = button.getAttribute('aria-label');
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    const shell = document.createElement('div');
    shell.className = 'youtube-player-shell';
    const watchLink = document.createElement('a');
    watchLink.className = 'youtube-watch-link';
    watchLink.href = `https://www.youtube.com/watch?v=${id}`;
    watchLink.target = '_blank';
    watchLink.rel = 'noopener';
    watchLink.textContent = 'Having trouble playing? Watch on YouTube ↗';
    shell.append(iframe, watchLink);
    button.replaceWith(shell);
  }, { once: true });
});

const bookingDialog = $('#bookingDialog');
$$('.open-booking').forEach((button) => button.addEventListener('click', () => {
  const plan = button.dataset.plan;
  if (plan) $('#bookingForm').elements.plan.value = plan;
  bookingDialog.showModal();
}));
$('#bookingClose')?.addEventListener('click', () => bookingDialog.close());
bookingDialog?.addEventListener('click', (event) => {
  const box = bookingDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) bookingDialog.close();
});
$('#bookingForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const plan = String(data.get('plan') || 'Not sure yet');
  const brief = String(data.get('brief') || '').trim();
  const subject = encodeURIComponent(`Project enquiry from ${name} — ${plan}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPackage: ${plan}\n\nProject details:\n${brief}`);
  window.location.href = `mailto:kamrannouman6@gmail.com?subject=${subject}&body=${body}`;
});

const rail = $('#reelRail');
const progress = $('#railProgress');
function updateRailProgress() {
  const max = rail.scrollWidth - rail.clientWidth;
  const amount = max > 0 ? (rail.scrollLeft / max) * 80 + 20 : 100;
  progress.style.width = `${amount}%`;
}
$('#railPrev').addEventListener('click', () => rail.scrollBy({ left: -rail.clientWidth * .72, behavior: 'smooth' }));
$('#railNext').addEventListener('click', () => rail.scrollBy({ left: rail.clientWidth * .72, behavior: 'smooth' }));
rail.addEventListener('scroll', updateRailProgress, { passive: true });
updateRailProgress();

let dragging = false;
let startX = 0;
let startScroll = 0;
rail.addEventListener('pointerdown', (event) => {
  if (event.target.closest('video')) return;
  dragging = true; startX = event.clientX; startScroll = rail.scrollLeft; rail.setPointerCapture(event.pointerId);
});
rail.addEventListener('pointermove', (event) => { if (dragging) rail.scrollLeft = startScroll - (event.clientX - startX); });
rail.addEventListener('pointerup', () => { dragging = false; });
rail.addEventListener('pointercancel', () => { dragging = false; });

document.addEventListener('play', (event) => {
  if (event.target.tagName !== 'VIDEO') return;
  $$('video').forEach((video) => { if (video !== event.target) video.pause(); });
}, true);

const glow = $('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
