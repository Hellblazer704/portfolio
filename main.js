// main.js — GSAP animations, navigation, counters, loader
import { initParticles } from './particles.js';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // ---- LOADER ----
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader?.classList.add('hidden');
    initAnimations();
  }, 1800);

  // ---- THREE.JS PARTICLES ----
  initParticles();

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar shadow
    navbar?.classList.toggle('scrolled', window.scrollY > 20);

    // Active link
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // ---- MOBILE MENU ----
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
  });

  window.closeMobile = () => {
    mobileMenu?.classList.remove('open');
    if (mobileToggle) mobileToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
  };

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        closeMobile();
      }
    });
  });

  // ---- CONTACT FORM ----
  window.handleContact = (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">check_circle</span> Sent!';
    btn.style.background = '#3E7C59';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  };

  // ---- ANIMATED COUNTERS ----
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      if (isNaN(target)) return;
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 40);
    });
  }

  // Run counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroMetrics = document.querySelector('.hero-metrics');
  if (heroMetrics) heroObserver.observe(heroMetrics);
});

// ---- GSAP ANIMATIONS ----
function initAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero stagger
  gsap.fromTo('#hero .reveal', 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
  );

  // Scroll indicator
  gsap.fromTo('.scroll-indicator',
    { opacity: 0 },
    { opacity: 1, delay: 1.5, duration: 0.6 }
  );

  // Generic reveal animations
  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('#hero')) return; // skip hero, already animated
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.fromTo(el, { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Achievement items stagger
  gsap.utils.toArray('.achievement-item').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Timeline items stagger
  gsap.utils.toArray('.timeline-item').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Skill tags stagger
  gsap.utils.toArray('.skill-tag').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 15, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.3, delay: i * 0.03, ease: 'power2.out',
      scrollTrigger: { trigger: el.parentElement, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Stat items
  gsap.utils.toArray('.stat-item').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Parallax on hero heading
  gsap.to('#hero h1', {
    yPercent: 30, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Section title parallax
  gsap.utils.toArray('.achievements-sticky h2, #about h2').forEach(el => {
    gsap.to(el, {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: true }
    });
  });
}
