gsap.registerPlugin(ScrollTrigger);

// cursor

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cursor, { x: mx, y: my, duration: 0.08, ease: 'power2.out' });
});

gsap.ticker.add(() => {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    gsap.set(ring, { x: rx, y: ry });
});

// progress bar
gsap.to('#progressBar', {
    width: '100%', ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.4 }
});

// hero timeline 
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
    .from('#mainNav', { autoAlpha: 0, y: -24, duration: 1 }, 0)
    .to('.hero-eyebrow', { autoAlpha: 1, duration: 0.8 }, 0.3)
    .to('.hero-title .word', { y: '0%', duration: 1.4, stagger: 0.13, ease: 'expo.out' }, 0.5)
    .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 1 }, 1)
    .to('.hero-cta', { autoAlpha: 1, duration: 1 }, 1.2)
    .to('#heroImg', { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'expo.inOut' }, 0.6)
    .to('#scrollInd', { autoAlpha: 1, duration: 1 }, 1.6)
    .to('#scrollLineEl', { scaleX: 1, duration: 0.9, ease: 'power2.out' }, 1.7);

// hero photo parallax
document.querySelectorAll('.hero-photo').forEach((ph, i) => {
    gsap.to(ph, {
        y: [-70, -50, -90, -40][i],
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: [5, 5, 4.5, 5.5][i] }
    });
});

// divider 
gsap.to(['#dl1', '#dl2'], {
    scaleX: 1, duration: 1.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.divider', start: 'top 80%' }
});
gsap.to('#divTxt', {
    autoAlpha: 1, duration: 1, delay: 0.4,
    scrollTrigger: { trigger: '.divider', start: 'top 80%' }
});

// services
// title lines manual split
const svcTitleEl = document.getElementById('svcTitle');
svcTitleEl.innerHTML = svcTitleEl.innerHTML.split('<br>').map(t => `<span class="stline" style="display:block; overflow:hidden;"><span style="display:block;">${t}</span></span>`).join('');
gsap.from('#svcTitle .stline > span', {
    y: '100%', autoAlpha: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out',
    scrollTrigger: { trigger: '#services', start: 'top 75%' }
});
gsap.to('.sec-desc', {
    autoAlpha: 1, duration: 1,
    scrollTrigger: { trigger: '#services', start: 'top 75%' }
});

ScrollTrigger.batch('.svc-card', {
    start: 'top 88%',
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' })
});

// horizontal scroll portfolio
const hTrack = document.getElementById('hTrack');

const hScrollAnim = gsap.to(hTrack, {
    x: () => -(hTrack.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
        trigger: '#hPin',
        start: 'top top',
        end: () => '+=' + (hTrack.scrollWidth - window.innerWidth + 80),
        pin: '.h-scroll-sticky',
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true
    }
});

// marquee 
const marquee = document.getElementById('marquee');
const mItem = marquee.querySelector('.m-text');
gsap.to(marquee, {
    x: () => -mItem.offsetWidth,
    duration: 18,
    ease: 'none',
    repeat: -1
});

// stats
document.querySelectorAll('.stat-card').forEach((card, i) => {
    const numEl = card.querySelector('.stat-num');
    const target = parseInt(numEl.dataset.target);

    gsap.to(card, {
        autoAlpha: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
    });

    ScrollTrigger.create({
        trigger: card, start: 'top 88%', once: true,
        onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target, duration: 2.2, ease: 'power2.out',
                onUpdate() { numEl.textContent = Math.round(obj.val); }
            });
        }
    });
});

// process

const procTitleEl = document.getElementById('procTitle');
procTitleEl.innerHTML = procTitleEl.innerHTML.split('<br>').map(t => `<span class="stline" style="display:block; overflow:hidden;"><span style="display:block;">${t}</span></span>`).join('');
gsap.from('#procTitle .stline > span', {
    y: '100%', autoAlpha: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out',
    scrollTrigger: { trigger: '#process', start: 'top 75%' }
});

ScrollTrigger.batch('.proc-item', {
    start: 'top 85%',
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' })
});

// testimonial
gsap.to('#tVisual', {
    autoAlpha: 1, x: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.testimonial', start: 'top 72%' }
});

gsap.to('#tQuote', {
    autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.testimonial', start: 'top 72%' }
});
gsap.set('#tQuote', { y: 30 });

gsap.to('#tAuthor', {
    autoAlpha: 1, duration: 1, delay: 0.4,
    scrollTrigger: { trigger: '.testimonial', start: 'top 72%' }
});

// cta
gsap.to('#ctaEye', {
    autoAlpha: 1, duration: 1,
    scrollTrigger: { trigger: '.cta', start: 'top 70%' }
});

gsap.to('.cta-title .word', {
    y: '0%', duration: 1.4, stagger: 0.14, ease: 'expo.out',
    scrollTrigger: { trigger: '.cta', start: 'top 70%' }
});

gsap.to('#ctaActs', {
    autoAlpha: 1, duration: 1, delay: 0.6,
    scrollTrigger: { trigger: '.cta', start: 'top 70%' }
});

// reduced motion
gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
    gsap.globalTimeline.timeScale(0.01);
});

ScrollTrigger.refresh();