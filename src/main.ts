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


// Impact Section Count-Up Animation
const stats = document.querySelectorAll('.stat-card .number');
stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target') || '0');
    const suffix = stat.getAttribute('data-suffix') || '+';
    
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: "top 95%",
            once: true
        },
        innerText: target,
        duration: 2.5,
        snap: { innerText: target % 1 === 0 ? 1 : 0.1 }, 
        onUpdate: function() {
            const currentVal = parseFloat((this.targets()[0] as HTMLElement).innerText);
            if (target % 1 !== 0) {
               (this.targets()[0] as HTMLElement).innerText = currentVal.toFixed(1) + suffix;
            } else {
               (this.targets()[0] as HTMLElement).innerText = Math.round(currentVal) + suffix;
            }
        }
    });
});

console.log('Godavari Construction Premium Redesign Active');

// Case Study Data & Modal Logic

const caseStudiesData: Record<string, { title: string, subtitle: string, description: string, services: string[], challenge: string, solution: string, outcome: string }> = {


    'elite-residency': {
        title: 'Elite Residency',
        subtitle: 'Luxury Residential | 2024',
        description: 'A premium 150-unit residential tower featuring panoramic city views, smart home integrations, and world-class amenities.',
        services: ['Architectural Design', 'Structural Engineering', 'Interior Finishing', 'MEP Solutions'],
        challenge: 'Urban density constraints required innovative vertical design while maintaining luxury standards and natural light penetration.',
        solution: 'Implemented cantilevered wing design with floor-to-ceiling glass facades and advanced MEP systems for optimal space utilization.',
        outcome: 'Delivered 20% ahead of schedule with 100% occupancy within 3 months of handover. Received Best Luxury Residential award.'
    },

    'heritage-square': {
        title: 'Heritage Square',
        subtitle: 'Premier Retail Hub | 2023',
        description: 'Heritage Square is a sprawling retail complex designed to merge modern aesthetics with maximum foot traffic utility. The project was completed two months ahead of schedule.',
        services: ['Commercial Construction', 'Site Planning', 'Safety Management'],
        challenge: 'Strict city zoning laws restricting structural footprints.',
        solution: 'Developed a sophisticated multi-level subterranean design.',
        outcome: 'Expanded retail capacity by 40% without violating local zoning codes.'
    },
    'construction-flow': {
        title: 'Construction Flow',
        subtitle: 'On-Site Progress | 2022',
        description: 'Showcasing our streamlined on-site logistics and machinery deployment, ensuring smooth transitions between project phases.',
        services: ['Project Management', 'Heavy Machinery Operation', 'Site Logistics'],
        challenge: 'Synchronizing trades in a high-density zone',
        solution: 'Implemented digital twin modeling for logistics',
        outcome: 'Reduced site waste by 15% and improved trade turnaround'
    },
    'industrial-park-south': {
        title: 'Industrial Park South',
        subtitle: 'Logistics Hub | 2023',
        description: 'A massive 50-acre industrial park built to support heavy manufacturing and national distribution pipelines.',
        services: ['Industrial Construction', 'Foundation Laying', 'Steel Frameworks'],
        challenge: 'Deep soil instability required massive foundational redesign',
        solution: 'Deployed complex micro-piling network across 50 acres',
        outcome: 'Secured structural integrity exceeding international warehouse standards'
    },
    'infrastructure-beats': {
        title: 'Infrastructure Beats',
        subtitle: 'Urban Engineering | 2024',
        description: 'A robust urban infrastructure project updating city intersections and vital commuter pathways.',
        services: ['Urban Planning', 'Civil Engineering', 'Roadwork'],
        challenge: 'Maintaining city traffic loops during major roadwork',
        solution: 'Detailed phased closure and rapid-cure aggregate materials',
        outcome: 'Completed intersection overhaul 3 weeks ahead of public deadline'
    },
    'modern-office-tower': {
        title: 'Modern Office Tower',
        subtitle: 'Corporate Space | 2022',
        description: 'A 40-story corporate tower designed for tech companies, featuring smart-building integrations and eco-friendly climate controls.',
        services: ['High-Rise Construction', 'Smart Glass Installation', 'HVAC Routing'],
        challenge: 'Extreme wind sheer testing on high floors',
        solution: 'Custom tuned mass damper installation and aerodynamic facade',
        outcome: 'Achieved LEED Platinum certification for energy efficiency'
    },
    'structural-precision': {
        title: 'Structural Precision',
        subtitle: 'Beam Integration | 2024',
        description: 'Detailed focus on our structural engineering phase, demonstrating the high precision steel beam integrations we standardly deploy.',
        services: ['Steel Fabrication', 'Structural Welding', 'Load Testing'],
        challenge: 'Complex geometric tolerances on custom spans',
        solution: 'Laser-guided CNC fabrication and multi-point automated checks',
        outcome: 'Zero-fault structural assembly on site'
    },
    'foundation-works': {
        title: 'Foundation Works',
        subtitle: 'Project Core | 2023',
        description: 'The critical early life of a skyscraper, highlighting the deep foundation pouring and site stabilization process.',
        services: ['Excavation', 'Concrete Pouring', 'Site Stabilization'],
        challenge: 'High water tables threatened the pour',
        solution: 'Continuous de-watering matrix and fast-cure marine concrete',
        outcome: 'Perfect foundational pour completed in a 48-hour continuous operation'
    },
    'machinery-in-motion': {
        title: 'Machinery in Motion',
        subtitle: 'Site Logistics | 2023',
        description: 'Operating heavy crane machinery and coordinating complex lifts in dense urban environments without disrupting local traffic.',
        services: ['Crane Operations', 'Urban Logistics', 'Safety Protocols'],
        challenge: 'Navigating overhead power lines during blind lifts',
        solution: 'Advanced riggers and multi-camera lift telemetry',
        outcome: '100% safety record with zero traffic disruptions'
    },
    'skyline-builders': {
        title: 'Skyline Builders',
        subtitle: 'Vertical Growth | 2024',
        description: 'The final stages of structural completion where the building core meets the sky, integrating the roof truss networks.',
        services: ['Roofing Systems', 'Vertical Integration', 'Final Structural Checks'],
        challenge: 'Weather dependencies at extreme altitudes',
        solution: 'Pre-fabricated modular roof trusses assembled internally',
        outcome: 'Topped out safely weeks before seasonal monsoon rains'
    }
};

// Project Modal Logic Removed

// Services Data & Modal Logic
const servicesData: Record<string, { title: string, description: string, benefits: string[], process: string[], image: string }> = {
    'residential': {
        title: 'Residential Construction',
        image: 'src/assets/GC%202.jpeg',
        description: 'Bespoke luxury homes and smart residential complexes designed with modern amenities. We handle everything from architectural planning to the final finishing touches.',
        benefits: ['Custom Home Design & Build', 'Smart Home Integration', 'Sustainable Materials', 'End-to-end Project Management'],
        process: ['Concept & Blueprint Approval', 'Structural & Core Construction', 'Interior Finishing & Final Handover']
    },
    'commercial': {
        title: 'Commercial Hubs',
        image: 'src/assets/GC%207.jpeg',
        description: 'Future-ready office spaces and retail hubs designed for maximum efficiency, tenant comfort, and high foot traffic. Built to international safety and sustainability standards.',
        benefits: ['High-Rise Office Construction', 'Retail Core Development', 'Advanced HVAC & MEP', 'LEED Certified Practices'],
        process: ['Site Logistics & Permitting', 'Erection of Core and Shell', 'Tenant Improvement & Fit-outs']
    },
    'renovations': {
        title: 'Structural Renovations',
        image: 'src/assets/GC%203.jpeg',
        description: 'Restoring and modernizing older structures with cutting-edge engineering. We breathe new life into existing buildings while preserving their historical integrity where required.',
        benefits: ['Structural Reinforcements', 'Facade Modernization', 'Interior Gut Remodels', 'Code Compliance Upgrades'],
        process: ['Structural Integrity Assessment', 'Selective Demolition & Shoring', 'Modern Re-integration & Trimming']
    },
    'architecture': {
        title: 'Architectural Planning',
        image: 'src/assets/GC%204.jpeg',
        description: 'Innovative designs that balance aesthetic beauty, structural functionality, and environmental sustainability. Our architects work closely with clients to visualize their perfect space.',
        benefits: ['3D Modeling & Visualization', 'Zoning & Permitting', 'Sustainable Design', 'Landscape Architecture'],
        process: ['Client Vision Briefing', 'Digital Twin & 3D Modeling', 'Final Permitting & Material Sourcing']
    },
    'interior-work': {
        title: 'Interior Excellence',
        image: 'src/assets/GC%206.jpeg',
        description: 'Specialized interior solutions for luxury homes and professional corporate spaces. We focus on ergonomics, lighting, and premium material selection.',
        benefits: ['Space Planning', 'Custom Millwork & Cabinetry', 'Lighting Design', 'Premium Material Sourcing'],
        process: ['Space & Flow Analysis', 'Custom Fabrication & Procurement', 'Installation & Quality Polish']
    }
};

// Services Modal Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Transform existing buttons into "Know More" triggers on the Services page
    const serviceButtons = document.querySelectorAll('.service-overlay .btn');
    serviceButtons.forEach(btn => {
        const card = btn.closest('.service-card');
        if (card) {
            const h3 = card.querySelector('h3');
            const title = h3 ? h3.textContent || 'Service' : 'Service';
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            btn.textContent = 'Know More';
            btn.className = 'btn btn-outline service-know-more-btn';
            btn.setAttribute('data-service', slug);
            btn.setAttribute('href', 'javascript:void(0)');
        }
    });

    // 2. Inject Detailed Services Modal HTML
    if (document.querySelector('.service-know-more-btn') && !document.getElementById('servicesModal')) {
        const modalHtml = `
            <div id="servicesModal" class="services-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content white-theme">
                    <button class="close-modal">&times;</button>
                    <div class="modal-body" id="serviceModalBody">
                        <h2 id="serviceModalTitle" class="theme-title">Service Title</h2>
                        <div class="theme-divider"></div>
                        <p class="theme-desc" id="serviceModalDescription">Description...</p>
                        
                        <div class="theme-dual-col">
                            <div class="theme-benefits-box">
                                <h3 class="theme-subtitle">Key Benefits</h3>
                                <ul id="serviceModalBenefits" class="theme-list"></ul>
                            </div>
                            <div class="theme-process-box">
                                <h3 class="theme-subtitle">Our Process</h3>
                                <div id="serviceModalProcess" class="theme-process-steps"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 3. Services Modal Interaction Logic
    const sModal = document.getElementById('servicesModal');
    const sOverlayBg = sModal?.querySelector('.modal-overlay');
    const sCloseBtn = sModal?.querySelector('.close-modal');
    
    const sTitleEl = document.getElementById('serviceModalTitle');
    const sDescEl = document.getElementById('serviceModalDescription');
    const sBenefitsEl = document.getElementById('serviceModalBenefits');
    const sProcessEl = document.getElementById('serviceModalProcess');

    const openServiceModal = (slug: string) => {
        if (!sModal) return;
        
        let data = servicesData[slug];
        if (!data) {
            data = {
                title: 'Professional Service',
                image: 'src/assets/GC%202.jpeg',
                description: 'Godavari Construction offers a wide suite of premium services tailored to your exact needs. Contact us to learn more.',
                benefits: ['Expert Consultation', 'Quality Craftsmanship', 'On-Time Delivery'],
                process: ['Initial Consultation', 'Planning Phase', 'Execution & Delivery']
            };
        }

        if (sTitleEl) sTitleEl.textContent = data.title;
        if (sDescEl) sDescEl.textContent = data.description;
        
        if (sBenefitsEl) {
            sBenefitsEl.innerHTML = '';
            data.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                sBenefitsEl.appendChild(li);
            });
        }

        if (sProcessEl) {
            sProcessEl.innerHTML = '';
            data.process.forEach((step, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'theme-process-step';
                stepDiv.innerHTML = '<span class="step-num">' + (index + 1) + '</span><span class="step-text">' + step + '</span>';
                sProcessEl.appendChild(stepDiv);
            });
        }

        sModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeServiceModal = () => {
        sModal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Attach click events via event delegation
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('service-know-more-btn')) {
            e.preventDefault();
            const slug = target.getAttribute('data-service');
            if (slug) openServiceModal(slug);
        }
    });

    sCloseBtn?.addEventListener('click', closeServiceModal);
    sOverlayBg?.addEventListener('click', closeServiceModal);
});

// Video Hover Playback Logic
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            item.addEventListener('mouseenter', () => {
                video.play().catch(err => console.warn("Video play interrupted or blocked:", err));
            });
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Optional: Reset to start on leave
            });
        }
    });
});

