// ============================================
// PROFESSIONAL PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initProfileFlip();
  initThemeToggle();
  initNavigation();
  initScrollEffects();
});

// ============================================
// PROFILE IMAGE FLIP ANIMATION
// ============================================

function initProfileFlip() {
  const profileImg = document.getElementById('profileFlip');
  if (!profileImg) return;

  profileImg.dataset.flipped = 'false';
  profileImg.addEventListener('click', function() {
    const isFlipped = this.dataset.flipped === 'true';
    const newSrc = isFlipped ? this.dataset.front : this.dataset.back;

    this.classList.add('flip');
    setTimeout(() => {
      this.src = newSrc;
      this.dataset.flipped = isFlipped ? 'false' : 'true';
    }, 300);

    this.addEventListener('animationend', function handler() {
      this.classList.remove('flip');
      this.removeEventListener('animationend', handler);
    });
  });
}

// ============================================
// THEME TOGGLE (LIGHT/DARK MODE)
// ============================================
const MOON_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>';
const SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/><g stroke="currentColor" stroke-width="1.5"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></g></svg>';

function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Set initial theme
  html.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);

  themeBtn.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButtonText(newTheme);
  });
}

function updateThemeButtonText(theme) {
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    // Show sun icon when dark (so clicking goes to light), moon when light
    themeBtn.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

// ============================================
// NAVIGATION - ACTIVE LINK HIGHLIGHTING
// ============================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero-section');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// ============================================
// SCROLL EFFECTS - ANIMATE ON SCROLL
// ============================================
function initScrollEffects() {
  // Observe elements and animate them on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elementsToObserve = document.querySelectorAll(
    '.skill-card, .tech-box, .project-card, .education-card, .info-item'
  );
  elementsToObserve.forEach(el => observer.observe(el));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Add fadeIn animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-link.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

// Smooth scroll behavior fallback for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
