// ── FILM DATA (Homepage 5 recent productions) ──
const films = [
  { year:2016, title:'Nandini Nursing Home', director:'P. V. Giri', cast:'Naveen Vijaya Krishna, Nitya Naresh', poster:'posters/nandini.png' },
  { year:2019, title:'Ekta', director:'G. Suman Reddy', cast:'Navneet Kaur Dhillon, Salil Ankola', poster:'posters/ekta.jpg' },
  { year:2021, title:'D3: Dosti Dil Dhokha', director:'Bhaskar Ram', cast:'Vamsi Yakasiri, Parth Bhalerao', poster:'posters/d3.png' },
  { year:2024, title:'TTDS', director:'Chenna Narayana', cast:'Priyadarshi Pulikonda, Manikandan R. Achari', poster:'https://pplx-res.cloudinary.com/image/upload/v1770468331/search_images/7386096bb21f64fe3f17b1483f0597ca4f6695b8.jpg' },
  { year:2024, title:'Dil Dosti Duniyadari', director:'Bhaskar Ram', cast:'Shubhankar Tawde, Dnyanada Ramtirthkar', poster:'posters/ddd.jpg' }
];

const awards = [
  { icon:'\u{1F3C6}', title:'Best Film', film:'Bommarillu', body:'Filmfare Awards South Best Telugu Film of the decade.', year:'2006' },
  { icon:'\u{1F947}', title:'Nandi Award', film:'Bommarillu', body:'AP State Nandi Award for Best Film.', year:'2006' },
  { icon:'\u{1F3AC}', title:'Best Director', film:'Arya', body:'Sukumar wins Best Director for his landmark debut.', year:'2004' },
  { icon:'\u2B50', title:'Best Actor', film:'Bommarillu', body:'Siddharth wins Best Actor across all major awards.', year:'2006' },
  { icon:'\u{1F3B5}', title:'Best Music', film:'Multiple Films', body:'DSP and Mickey J. Meyer sweep Best Music awards.', year:'2006-08' },
  { icon:'\u{1F31F}', title:'Filmfare South', film:'Kotha Bangaru Lokam', body:'Five Filmfare Awards South including Best Film.', year:'2009' },
  { icon:'\u{1F3C5}', title:'Nandi Awards', film:'Parugu', body:'Two Nandi Awards for direction and performance.', year:'2009' },
  { icon:'\u{1F3AD}', title:'Best Comedy', film:'Nandini Nursing Home', body:'Best Comedy Performance at regional awards.', year:'2016' }
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
    .to('#heroLogoWrap', { opacity:1, scale:1, duration:1 }, 0)
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
  document.querySelectorAll('a,button,.film-card,.bts-inner,.award-card').forEach(el => {
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

// ── RENDER AWARDS ──
const ag = document.getElementById('awardsGrid');
awards.forEach(a => {
  const el = document.createElement('div');
  el.className = 'award-card';
  el.innerHTML = `<span class="award-icon">${a.icon}</span><div class="award-title">${a.title}</div><div class="award-film">${a.film}</div><div class="award-body">${a.body}</div><div class="award-year">${a.year}</div>`;
  ag.appendChild(el);
});

// ── SCROLL ANIMATIONS ──
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section-label').forEach(el => {
  gsap.to(el, { opacity:1, x:0, duration:.8, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 85%' }});
});
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.to(el, { opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 82%' }});
});
gsap.utils.toArray('.section-sub').forEach(el => {
  gsap.to(el, { opacity:1, y:0, duration:.9, delay:.1, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 80%' }});
});
gsap.utils.toArray('.stat-item').forEach((el,i) => {
  gsap.to(el, { opacity:1, y:0, duration:.6, delay:i*.1, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%', onEnter() {
      const n=el.querySelector('.stat-num'); const t=parseInt(n.dataset.count);
      const u=n.querySelector('.stat-unit'); let c=0; const s=t/40;
      const iv=setInterval(() => {
        c=Math.min(c+s,t); n.textContent=Math.floor(c);
        if(u) n.appendChild(u); if(c>=t) clearInterval(iv);
      }, 30);
    }}});
});
gsap.utils.toArray('.film-card').forEach((el,i) => {
  gsap.fromTo(el, {opacity:0,y:40}, {opacity:1,y:0,duration:.7,delay:i*.1,ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%' }});
});
gsap.utils.toArray('.award-card').forEach((el,i) => {
  gsap.to(el, { opacity:1, y:0, duration:.6, delay:(i%4)*.08, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 87%' }});
});
gsap.utils.toArray('.bts-cell').forEach((el,i) => {
  gsap.fromTo(el, {opacity:0,y:20}, {opacity:1,y:0,duration:.7,delay:i*.08,ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%' }});
});
gsap.fromTo('.producer-inner', {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power3.out',
  scrollTrigger:{ trigger:'#producer', start:'top 75%' }});
gsap.to('#heroContent', { y:60, ease:'none',
  scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true }});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});
