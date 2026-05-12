/* ===========================
   SATISH KUMAR MISHRA — Portfolio JS
   All animations, interactions, effects
=========================== */

// ─── LOADER ─────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');

  // Animate progress bar
  setTimeout(() => { loaderFill.style.width = '100%'; }, 100);

  // Hide loader after fill completes
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAll();
  }, 2200);

  document.body.style.overflow = 'hidden';
});

function initAll() {
  initCursor();
  initParticles();
  initNavbar();
  initHamburger();
  initTyped();
  initReveal();
  initSkillBars();
  initStatCounters();
  initContactForm();
  initSmoothLinks();
}


// ─── CUSTOM CURSOR ──────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  // Smooth follower
  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}


// ─── PARTICLE CANVAS ────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -1000, y: -1000 };
  const COUNT = 80;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '124,109,250' : '250,109,142';
    }
    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.vx += (dx / dist) * force * 0.5;
        this.vy += (dy / dist) * force * 0.5;
      }
      // Damping
      this.vx *= 0.98; this.vy *= 0.98;
      // Limits
      this.vx = Math.max(-1, Math.min(1, this.vx));
      this.vy = Math.max(-1, Math.min(1, this.vy));
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          const alpha = (1 - d / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,109,250,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }

  loop();
}


// ─── NAVBAR ─────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}


// ─── HAMBURGER MENU ─────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}


// ─── TYPED TEXT ─────────────────────────────────
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const words = [
    'Spring Boot Dev',
    'Microservices Architect',
    'Kafka Enthusiast',
    'AWS Cloud Engineer',
    'Problem Solver'
  ];

  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    }
  }

  setTimeout(type, 800);
}


// ─── SCROLL REVEAL ──────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.style.animationDelay || '0s';
        const delayMs = parseFloat(delay) * 1000;
        setTimeout(() => el.classList.add('visible'), delayMs);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}


// ─── SKILL BAR ANIMATION ────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(b => observer.observe(b));
}


// ─── STAT COUNTERS ──────────────────────────────
function initStatCounters() {
  const nums = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, 0, target, 1400);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

function animateCounter(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(start + range * ease);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end;
  }

  requestAnimationFrame(update);
}


// ─── CONTACT FORM ───────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sent!';
    btn.style.background = '#4ade80';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}


// ─── SMOOTH SCROLL LINKS ────────────────────────
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
