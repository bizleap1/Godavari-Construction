import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    menuBtn.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuBtn?.classList.remove('open');
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Parallax Effect
gsap.to(".parallax", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: "30%",
  ease: "none"
});

// Global Scroll Reveals
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power4.out"
  });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
  const targetAttr = stat.getAttribute('data-target');
  if (targetAttr) {
    const target = parseInt(targetAttr);
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 90%",
      },
      innerHTML: target,
      duration: 2.5,
      snap: { innerHTML: 1 },
      ease: "power2.out"
    });
  }
});

// Services Modal Logic - Re-engineered for Case Study Format
const serviceCards = document.querySelectorAll('.service-card');
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
  <div class="modal-content">
    <div class="modal-close">&times;</div>
    <div class="case-study-header">
      <span class="case-study-tag">Case Study</span>
      <h2 id="modal-title"></h2>
    </div>
    <div class="case-study-grid">
      <div class="case-study-main">
        <section>
          <h4>The Challenge</h4>
          <p id="modal-challenge"></p>
        </section>
        <section>
          <h4>Our Solution</h4>
          <p id="modal-solution"></p>
        </section>
        <section>
          <h4>Key Outcome</h4>
          <p id="modal-outcome"></p>
        </section>
      </div>
      <div class="case-study-sidebar">
        <span class="sidebar-title">Project Profile</span>
        <div class="detail-item">
          <span class="detail-label">Service Type</span>
          <span class="detail-value" id="modal-service"></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Tech Stack</span>
          <span class="detail-value" id="modal-tech">Advanced BIM, High-Tensile Steel</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Duration</span>
          <span class="detail-value">Ongoing / Finished</span>
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(modalOverlay);

const modalTitle = document.getElementById('modal-title') as HTMLElement;
const modalChallenge = document.getElementById('modal-challenge') as HTMLElement;
const modalSolution = document.getElementById('modal-solution') as HTMLElement;
const modalOutcome = document.getElementById('modal-outcome') as HTMLElement;
const modalService = document.getElementById('modal-service') as HTMLElement;
const closeModalBtn = modalOverlay.querySelector('.modal-close') as HTMLElement;

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.getAttribute('data-title');
    const challenge = card.getAttribute('data-challenge') || "Identifying structural bottlenecks and optimizing resource allocation for complex terrain.";
    const solution = card.getAttribute('data-solution') || "Implementing advanced 3D modeling and sustainable construction techniques to ensure longevity.";
    const outcome = card.getAttribute('data-outcome') || "A landmark structure delivered with zero-accident safety records and 100% material efficiency.";
    const service = card.getAttribute('data-service') || "General Construction";

    if (title) {
      modalTitle.textContent = title;
      modalChallenge.textContent = challenge;
      modalSolution.textContent = solution;
      modalOutcome.textContent = outcome;
      modalService.textContent = service;
      
      modalOverlay.classList.add('active');
      gsap.from('.modal-content', { 
        y: 100, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power4.out' 
      });
      lenis.stop(); // Stop scroll when modal open
    }
  });
});

const closeModal = () => {
  gsap.to('.modal-content', { 
    y: 50, 
    opacity: 0, 
    duration: 0.4, 
    onComplete: () => {
      modalOverlay.classList.remove('active');
      gsap.set('.modal-content', { y: 0, opacity: 1 });
      lenis.start(); // Start scroll again
    } 
  });
};

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

console.log('Godavari Construction Re-engineered');
