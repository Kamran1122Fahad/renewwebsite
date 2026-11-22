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

}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateScrollEffects(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
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

const dialog = $('#clientDialog');
$('#openClient')?.addEventListener('click', () => {
  const client = clients.talha;
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




// Swap a YouTube cover button for an inline player.
function mountYouTube(button) {
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
}

// Long-form showcase: an endless, always-moving coverflow. The card in the
// middle is the largest; cards shrink step by step toward both edges, where
// the row fades out. Drag or swipe to scrub, click a card to bring it to the
// centre and play it.
function mountReel(button) {
  const video = document.createElement('video');
  video.className = 'reel-player';
  video.controls = true;
  video.playsInline = true;
  video.autoplay = true;
  video.poster = button.dataset.poster;
  video.src = button.dataset.src;
  button.replaceWith(video);
  video.play().catch(() => {});
}

function initCoverflow(stage, opts) {
  if (!stage) return;
  const cards = Array.from(stage.querySelectorAll('.cf-card'));
  const n = cards.length;
  if (!n) return;
  const caption = opts.caption;
  const section = stage.closest('section') || stage;
  const STEP = opts.step || 220; // px of page scroll per video
  let pos = 0;
  let target = 0;
  let dragging = false;
  let moved = 0;
  let startX = 0;
  let startPos = 0;
  let shownCaption = -1;
  let live = { index: -1, el: null };
  let settleTimer = 0;
  let last = performance.now();
  const wrap = (d) => d - n * Math.round(d / n);
  const mod = (i) => ((i % n) + n) % n;
  const cardWidth = () => cards[0].offsetWidth || 600;

  // The centre card plays a muted preview; it stops when it leaves the centre.
  function stopLive() {
    if (live.el) { live.el.remove(); cards[live.index]?.classList.remove('is-live'); }
    live = { index: -1, el: null };
  }
  function startLive(index, withSound = false) {
    if (live.index === index && !withSound) return;
    stopLive();
    const card = cards[index];
    const cover = card.querySelector(opts.cover);
    if (!cover) return;
    const el = opts.preview(cover, withSound);
    el.classList.add('cf-live');
    card.append(el);
    card.classList.add('is-live');
    live = { index, el };
  }
  function scheduleSettle() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      target = Math.round(target);
      const idx = mod(target);
      const rect = stage.getBoundingClientRect();
      if (opts.autoplay !== false && rect.bottom > 0 && rect.top < innerHeight) startLive(idx);
    }, 450);
  }

  function render() {
    const w = cardWidth();
    let nearest = 0;
    let nearestA = Infinity;
    cards.forEach((card, i) => {
      const d = wrap(i - pos);
      const a = Math.abs(d);
      const dir = Math.sign(d) || 1;
      const scale = 1 / (1 + 0.28 * a);
      const x = dir * w * (opts.spread || 0.66) * a / (1 + 0.22 * a);
      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, 0) scale(${scale.toFixed(3)})`;
      card.style.zIndex = String(200 - Math.round(a * 20));
      card.style.visibility = a > n / 2 - 0.6 ? 'hidden' : 'visible';
      card.classList.toggle('is-center', a < 0.5);
      if (a < nearestA) { nearestA = a; nearest = i; }
    });
    if (live.index !== -1 && live.index !== nearest) stopLive();
    if (caption && nearest !== shownCaption) {
      shownCaption = nearest;
      const card = cards[nearest];
      caption.innerHTML = '';
      const who = document.createElement('span');
      who.textContent = card.dataset.client;
      const title = document.createElement('strong');
      title.textContent = card.dataset.title;
      caption.append(who, title);
    }
  }

  function tick(now) {
    const dt = Math.min(now - last, 64) / 1000;
    last = now;
    if (!dragging) {
      const diff = target - pos;
      pos += Math.abs(diff) < 0.001 ? diff : diff * Math.min(1, dt * 8);
    }
    render();
    requestAnimationFrame(tick);
  }

  // Page scroll moves the carousel, but only once the carousel has reached
  // the middle of the screen, so the first video is always the one you see
  // when you arrive. Scrolling back up returns to it.
  let manual = 0;
  let scrollPart = 0;
  const readScroll = () => {
    const r = stage.getBoundingClientRect();
    const offset = innerHeight / 2 - (r.top + r.height / 2);
    return Math.max(0, Math.round(offset / STEP));
  };
  window.addEventListener('scroll', () => {
    const next = readScroll();
    if (next === scrollPart) return;
    scrollPart = next;
    target = manual + scrollPart;
    scheduleSettle();
  }, { passive: true });

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('iframe, video.cf-live[controls], a')) return;
    dragging = true; moved = 0; startX = event.clientX; startPos = pos;
    stage.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    moved = Math.max(moved, Math.abs(event.clientX - startX));
    pos = startPos - (event.clientX - startX) / (cardWidth() * 0.62);
    target = pos;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-dragging');
    target = Math.round(pos);
    manual = target - scrollPart;
    scheduleSettle();
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  stage.addEventListener('click', (event) => {
    if (moved > 6) { event.preventDefault(); moved = 0; return; }
    const button = event.target.closest(opts.cover);
    if (!button) return;
    const card = button.closest('.cf-card');
    const i = cards.indexOf(card);
    const d = wrap(i - pos);
    if (Math.abs(d) < 0.5) { clearTimeout(settleTimer); startLive(i, true); return; }
    target = Math.round(pos + d);
    manual = target - scrollPart;
    scheduleSettle();
  });

  const step = (dir) => { target = Math.round(target) + dir; manual = target - scrollPart; scheduleSettle(); };
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  });
  opts.prev?.addEventListener('click', () => step(-1));
  opts.next?.addEventListener('click', () => step(1));
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) scheduleSettle(); else stopLive();
  }, { threshold: 0.35 }).observe(stage);
  window.addEventListener('resize', render, { passive: true });
  render();
  requestAnimationFrame(tick);
}

function youtubePreview(cover, withSound) {
  const iframe = document.createElement('iframe');
  const origin = /^https?:$/.test(location.protocol) ? `&origin=${encodeURIComponent(location.origin)}` : '';
  iframe.src = `https://www.youtube.com/embed/${cover.dataset.video}?autoplay=1&mute=${withSound ? 0 : 1}&rel=0&playsinline=1&modestbranding=1${origin}`;
  iframe.title = cover.getAttribute('aria-label');
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  return iframe;
}
function reelPreview(cover, withSound) {
  const video = document.createElement('video');
  video.src = cover.dataset.src;
  video.poster = cover.dataset.poster;
  video.muted = !withSound;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  if (withSound) video.controls = true;
  video.play().catch(() => {});
  return video;
}

initCoverflow($('#coverflow'), { cover: '.youtube-cover', preview: youtubePreview, autoplay: false, caption: $('#cfCaption'), prev: $('#cfPrev'), next: $('#cfNext') });
initCoverflow($('#reelflow'), { cover: '.reel-cover', preview: reelPreview, caption: $('#rfCaption'), prev: $('#rfPrev'), next: $('#rfNext'), spread: 0.82, step: 180 });

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

document.addEventListener('play', (event) => {
  if (event.target.tagName !== 'VIDEO') return;
  $$('video').forEach((video) => { if (video !== event.target) video.pause(); });
}, true);

const glow = $('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Count-up numbers ([data-count]) that run when they scroll into view.
(function initCountUps() {
  const nodes = $$('[data-count]');
  if (!nodes.length) return;
  const show = (node, value) => {
    const decimals = Number(node.dataset.decimals || 0);
    node.textContent = `${value.toFixed(decimals)}${node.dataset.suffix || ''}`;
  };
  const run = (node) => {
    const target = Number(node.dataset.count);
    if (reducedMotion) { show(node, target); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 1600);
      show(node, target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) { nodes.forEach((n) => show(n, Number(n.dataset.count))); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    io.unobserve(entry.target);
    run(entry.target);
  }), { threshold: 0.6 });
  nodes.forEach((n) => { show(n, 0); io.observe(n); });
})();

// Hero ring: cards orbit the portrait. Front cards sit over the portrait,
// back cards behind it. Turns slowly on its own; drag or swipe to spin it.
(function initHeroRing() {
  const ring = $('#heroRing');
  if (!ring) return;
  const cards = $$('.ring-card', ring);
  const n = cards.length;
  let angle = 0;
  let velocity = 0;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let hover = false;
  let visible = true;
  let last = performance.now();
  const AUTO = 0.12; // radians per second

  function layout() {
    const w = ring.clientWidth;
    const live = cards.filter((card) => getComputedStyle(card).display !== 'none');
    const count = live.length || 1;
    const radius = w < 600 ? w * 0.34 : Math.min(w * 0.3, 380);
    live.forEach((card, i) => {
      const a = angle + (i / count) * Math.PI * 2;
      const z = Math.cos(a);
      const x = Math.sin(a) * radius;
      const y = -z * 26;
      const scale = 0.72 + 0.28 * ((z + 1) / 2);
      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateY(${(Math.sin(a) * 28).toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.zIndex = z > -0.05 ? String(30 + Math.round(z * 10)) : String(5 + Math.round((z + 1) * 4));
      card.style.opacity = (z < -0.05 ? 0.18 + 0.4 * ((z + 1) / 2) : 0.55 + 0.45 * z).toFixed(2);
      card.style.filter = z < -0.05 ? 'blur(2px)' : 'none';
      card.classList.toggle('is-back', z < -0.05);
    });
  }
  function tick(now) {
    const dt = Math.min(now - last, 64) / 1000;
    last = now;
    if (!dragging) {
      angle += velocity * dt;
      velocity *= Math.pow(0.05, dt);
      if (Math.abs(velocity) < 0.01) velocity = 0;
      if (!reducedMotion && !hover && visible) angle += AUTO * dt;
    }
    layout();
    requestAnimationFrame(tick);
  }
  const unit = () => Math.max(ring.clientWidth * 0.5, 200);
  ring.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging = true; velocity = 0; lastX = event.clientX; lastT = performance.now();
    ring.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const now = performance.now();
    const d = (event.clientX - lastX) / unit();
    angle += d;
    if (now > lastT) velocity = d / ((now - lastT) / 1000);
    lastX = event.clientX; lastT = now;
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    ring.classList.remove('is-dragging');
    if (performance.now() - lastT > 80) velocity = 0;
    velocity = Math.max(-4, Math.min(4, velocity));
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
  ring.addEventListener('mouseenter', () => { hover = true; });
  ring.addEventListener('mouseleave', () => { hover = false; });
  ring.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); velocity = 2.2; }
    if (event.key === 'ArrowLeft') { event.preventDefault(); velocity = -2.2; }
  });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(ring);
  window.addEventListener('resize', layout, { passive: true });
  layout();
  requestAnimationFrame(tick);
})();

// Mark the nav link for the section currently in view.
(function initNavIndicator() {
  const links = $$('.site-header nav a[href^="#"]');
  const targets = links.map((link) => [link, $(link.getAttribute('href'))]).filter(([, el]) => el);
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    targets.forEach(([link, el]) => link.classList.toggle('is-current', el === entry.target));
  }), { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(([, el]) => io.observe(el));
})();

// Talha Reviews AI reels: covers link to Instagram. On the live site the
// click loads Instagram's player in place; inside a sandboxed preview frame
// (where embeds are blocked) the link simply opens Instagram.
if (window.self === window.top) {
  $$('.ai-cover').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const frame = document.createElement('iframe');
    frame.src = `https://www.instagram.com/reel/${link.dataset.reel}/embed/`;
    frame.title = link.getAttribute('aria-label');
    frame.setAttribute('scrolling', 'no');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    link.replaceWith(frame);
  }, { once: true }));
}

// Orange glow that follows the cursor inside each section, plus a light
// parallax on the orbit stage.
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  const sections = $$('main > section');
  let frame = 0;
  let lastEvent = null;
  window.addEventListener('pointermove', (event) => {
    lastEvent = event;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const e = lastEvent;
      sections.forEach((section) => {
        const r = section.getBoundingClientRect();
        if (e.clientY < r.top - 300 || e.clientY > r.bottom + 300) return;
        section.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`);
        section.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`);
      });
      const stage = $('#orbitStage');
      if (stage && window.innerWidth > 760) {
        const r = stage.parentElement.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * -24;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * -24;
        stage.style.setProperty('--px', `${dx.toFixed(1)}px`);
        stage.style.setProperty('--py', `${dy.toFixed(1)}px`);
      }
    });
  }, { passive: true });
})();

// Liquid glass header: specular highlight follows the cursor, and the text
// switches to cream while the header floats over a navy section.
(function initGlassHeader() {
  const header = $('.site-header');
  if (!header) return;
  header.addEventListener('pointermove', (event) => {
    const r = header.getBoundingClientRect();
    header.style.setProperty('--hx', `${(event.clientX - r.left).toFixed(0)}px`);
    header.style.setProperty('--hy', `${(event.clientY - r.top).toFixed(0)}px`);
  });
  header.addEventListener('pointerleave', () => { header.style.removeProperty('--hx'); header.style.removeProperty('--hy'); });
  const sections = $$('main > section, main > .ribbon');
  const isDark = (el) => {
    const m = getComputedStyle(el).backgroundColor.match(/\d+(\.\d+)?/g);
    if (!m) return false;
    const [r, g, b, a = 1] = m.map(Number);
    return a > 0.5 && (0.299 * r + 0.587 * g + 0.114 * b) < 110;
  };
  const darkMap = new Map(sections.map((s) => [s, isDark(s)]));
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = header.getBoundingClientRect().top + header.offsetHeight / 2;
    const under = sections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    header.classList.toggle('on-dark', !!under && darkMap.get(under));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
