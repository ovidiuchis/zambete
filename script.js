// Navigation functionality
let activeSection = "home";

// Smooth scrolling function
function scrollToSection(sectionId) {
  activeSection = sectionId;
  const element = document.getElementById(sectionId);

  if (element) {
    // Calculate offset for fixed navbar
    const navbarHeight = document.getElementById("navbar").offsetHeight;
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });

    // Update active nav link
    updateActiveNavLink(sectionId);
  }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
  // Remove active class from all nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Add active class to current nav link
  const sections = ["home", "about", "therapists", "contact"];
  const sectionIndex = sections.indexOf(sectionId);
  if (sectionIndex !== -1 && navLinks[sectionIndex]) {
    navLinks[sectionIndex].classList.add("active");
  }
}

// Intersection Observer for scroll-based navigation highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navbarHeight = document.getElementById("navbar").offsetHeight;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          activeSection = sectionId;
          updateActiveNavLink(sectionId);
        }
      });
    },
    {
      rootMargin: `-${navbarHeight}px 0px -50% 0px`,
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Add navbar background on scroll
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(12px)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
      navbar.style.backdropFilter = "blur(12px)";
    }
  });
}

// Add hover effects to cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".feature-card, .therapist-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

// Add click effect to buttons
function initButtonEffects() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add CSS for ripple animation
function addRippleCSS() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Add parallax effect to hero section
function initParallaxEffect() {
  const heroSection = document.getElementById("home");
  const visualItems = document.querySelectorAll(".visual-item");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroSection && scrolled < heroSection.offsetHeight) {
      visualItems.forEach((item, index) => {
        const speed = 0.5 + index * 0.1;
        item.style.transform = `translateY(${rate * speed}px)`;
      });
    }
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initScrollSpy();
  initNavbarScroll();
  initCardHoverEffects();
  initButtonEffects();
  addRippleCSS();
  initParallaxEffect();

  // Set initial active nav link
  updateActiveNavLink("home");
});

// Add mobile menu functionality (for future enhancement)
function initMobileMenu() {
  // This can be enhanced in the future to include a mobile hamburger menu
  const navbar = document.getElementById("navbar");

  // Add mobile menu button if screen is small
  if (window.innerWidth <= 768) {
    console.log("Mobile view detected - menu can be enhanced for mobile");
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  initMobileMenu();
});

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  // Polyfill for smooth scrolling
  window.scrollTo = function (options) {
    if (typeof options === "object") {
      const startY = window.pageYOffset;
      const targetY = options.top;
      const distance = targetY - startY;
      const duration = 500;
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }
  };
}
