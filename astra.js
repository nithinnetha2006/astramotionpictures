// ── FILM DATA (Homepage 5 recent productions) ──
const films = [
  { year:2016, title:'Nandini Nursing Home', director:'P. V. Giri', cast:'Naveen Vijaya Krishna, Nitya Naresh', poster:'posters/nandini.png' },
  { year:2019, title:'Ekta', director:'G. Suman Reddy', cast:'Navneet Kaur Dhillon, Salil Ankola', poster:'posters/ekta.jpg' },
  { year:2021, title:'D3: Dosti Dil Dhokha', director:'Bhaskar Ram', cast:'Vamsi Yakasiri, Parth Bhalerao', poster:'posters/d3.png' },
  { year:2024, title:'TTDS', director:'Chenna Narayana', cast:'Priyadarshi Pulikonda, Manikandan R. Achari', poster:'https://pplx-res.cloudinary.com/image/upload/v1770468331/search_images/7386096bb21f64fe3f17b1483f0597ca4f6695b8.jpg' },
  { year:2024, title:'Dil Dosti Duniyadari', director:'Bhaskar Ram', cast:'Shubhankar Tawde, Dnyanada Ramtirthkar', poster:'posters/ddd.jpg' }
];


// ── LOADER ──
function runLoader() {
  const logo = document.getElementById('loader-logo');
  const tag = document.getElementById('loader-tag');
  const loader = document.getElementById('loader');
  gsap.timeline()
    .to(logo, { opacity:1, scale:1, duration:1.2, ease:'power3.out', delay:0.3 })
    .to(tag, { opacity:1, duration:.6 }, '-=.4')
    .to(loader, { opacity:0, duration:.8, delay:0.8, ease:'power2.inOut',
      onComplete() { loader.style.display='none'; runHeroAnim(); }
    });
}
window.addEventListener('load', runLoader);

// ── HERO ANIMATION ──
function runHeroAnim() {
  gsap.timeline({ defaults:{ ease:'power4.out' }})
    .to('#heroEyebrow', { opacity:1, y:0, duration:.8 }, 0.3)
    .to('.hero-title .word', { opacity:1, y:0, duration:1, stagger:.15 }, 0.5)
    .to('#heroSub', { opacity:1, duration:.8 }, 1)
    .to('#heroBtns', { opacity:1, duration:.7 }, 1.2);
}

// ── PARTICLES ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random()*canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random()*1.8 + .3;
    this.sx = (Math.random()-.5)*.4;
    this.sy = -(Math.random()*1 + .3);
    this.life = 1;
    this.decay = Math.random()*.004 + .002;
    this.br = Math.random()*.5 + .5;
  }
  update() {
    this.x += this.sx; this.y += this.sy;
    this.life -= this.decay;
    this.sx += (Math.random()-.5)*.04;
    if (this.life <= 0) this.reset();
  }
  draw() {
    const a = this.life * this.br;
    ctx.fillStyle = `rgba(200,164,92,${a*.25})`;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
  }
}
for (let i=0; i<100; i++) particles.push(new Particle());
(function anim() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(anim);
})();

// ── CURSOR ──
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring) {
  let cx=0, cy=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    cx=e.clientX; cy=e.clientY;
    dot.style.left=cx+'px'; dot.style.top=cy+'px';
  });
  (function curAnim() {
    rx+=(cx-rx)*.12; ry+=(cy-ry)*.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(curAnim);
  })();
  document.querySelectorAll('a,button,.film-card,.bts-inner').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='60px'; ring.style.height='60px'; ring.style.background='rgba(200,164,92,0.08)'; });
    el.addEventListener('mouseleave', () => { ring.style.width='40px'; ring.style.height='40px'; ring.style.background='transparent'; });
  });
}

// ── NAV ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});
document.getElementById('navBurger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow='hidden';
});
document.getElementById('mobileClose').addEventListener('click', closeMobile);
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow='';
}

// ── MARQUEE ──
const mItems = ['ASTRA MOTION PICTURES','WHERE STORIES IGNITE','TELUGU CINEMA','SINCE 2003','HYDERABAD','CINEMATIC EXCELLENCE','PRIVATE LIMITED'];
const track = document.getElementById('marqueeTrack');
for (let r=0; r<3; r++) mItems.forEach(item => {
  track.innerHTML += `<span class="marquee-item">${item}<span>\u00b7</span></span>`;
});

// ── RENDER FILMS ──
function renderFilms() {
  const grid = document.getElementById('filmsGrid');
  films.forEach(f => {
    const card = document.createElement('div');
    card.className = 'film-card';
    card.innerHTML = `
      <img class="film-card-img" src="${f.poster}" alt="${f.title}" loading="lazy" onerror="this.style.display='none'">
      <div class="film-card-overlay"></div>
      <div class="film-card-info">
        <div class="film-year">${f.year}</div>
        <div class="film-name">${f.title}</div>
        <div class="film-director">Dir. ${f.director}</div>
        <div class="film-cast">${f.cast}</div>
      </div>
      <div class="film-card-accent"></div>`;
    grid.appendChild(card);
  });
}
renderFilms();


// ── SCROLL ANIMATIONS ──
gsap.registerPlugin(ScrollTrigger);

// 1. Hero Scroll Scrub (Apple style zoom & fade-out)
gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})
.to('#heroContent', { y: -80, scale: 0.93, opacity: 0, ease: 'none' }, 0)
.to('#particleCanvas', { y: 120, scale: 1.08, opacity: 0.35, ease: 'none' }, 0);

// 2. Section Headers Orchestrated Reveal
gsap.utils.toArray('.section-header').forEach(hdr => {
  const label = hdr.querySelector('.section-label');
  const title = hdr.querySelector('.section-title');
  const sub = hdr.querySelector('.section-sub');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hdr,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });

  if (label) tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  if (title) tl.fromTo(title, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45');
  if (sub) tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
});

// 3. Staggered Stat Items Count-up
gsap.utils.toArray('.stat-item').forEach((el, i) => {
  gsap.fromTo(el, 
    { opacity: 0, y: 30, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onComplete() {
        const n = el.querySelector('.stat-num'); 
        const t = parseInt(n.dataset.count);
        const u = n.querySelector('.stat-unit'); 
        let c = 0; 
        const s = t / 45;
        const iv = setInterval(() => {
          c = Math.min(c + s, t); 
          n.textContent = Math.floor(c);
          if (u) n.appendChild(u); 
          if (c >= t) clearInterval(iv);
        }, 25);
      }
    }
  );
});

// 4. Staggered Reveal for Corporate Cards
gsap.fromTo('.corp-card', 
  { opacity: 0, y: 55, scale: 0.94 }, 
  { 
    opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out', stagger: 0.15,
    scrollTrigger: { trigger: '.corp-grid', start: 'top 85%' }
  }
);

// 5. Staggered Card Reveal + Image Parallax Scroll for Upcoming Productions (GTA 6 style)
gsap.fromTo('.upcoming-card',
  { opacity: 0, y: 70, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15,
    scrollTrigger: { trigger: '.upcoming-grid', start: 'top 85%' }
  }
);

gsap.utils.toArray('.upcoming-card').forEach(card => {
  const img = card.querySelector('.upcoming-card-img');
  if (img) {
    gsap.fromTo(img, { yPercent: -12 }, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
});

// 6. Staggered Card Reveal + Image Parallax Scroll for Filmography Grid
gsap.fromTo('.film-card',
  { opacity: 0, y: 70, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', stagger: 0.12,
    scrollTrigger: { trigger: '#filmsGrid', start: 'top 85%' }
  }
);

gsap.utils.toArray('.film-card').forEach(card => {
  const img = card.querySelector('.film-card-img');
  if (img) {
    gsap.fromTo(img, { yPercent: -12 }, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
});

// 7. Staggered Reveal for Behind The Lens grid
gsap.fromTo('.bts-cell',
  { opacity: 0, y: 40, scale: 0.96 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.bts-grid', start: 'top 88%' }
  }
);

// 8. Producer Section Parallax Overlapping Entrance
gsap.fromTo('.producer-portrait',
  { opacity: 0, x: -50, scale: 0.95 },
  {
    opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power4.out',
    scrollTrigger: { trigger: '#producer', start: 'top 78%' }
  }
);

gsap.fromTo('.producer-info',
  { opacity: 0, x: 50 },
  {
    opacity: 1, x: 0, duration: 1.3, ease: 'power4.out',
    scrollTrigger: { trigger: '#producer', start: 'top 78%' }
  }
);

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});
