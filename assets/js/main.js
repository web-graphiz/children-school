// ========================================
// HAPPY KIDS SCHOOL - MAIN JAVASCRIPT
// ========================================

class HappyKidsSchool {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupFAQ();
    this.setupGalleryLightbox();
    this.setupStatsCounter();
    this.setupBackToTop();
    this.setupFormSubmission();
    this.setupScrollEffects();
  } // ========================================
  // MOBILE MENU
  // ========================================
  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const isActive = navLinks.classList.contains("active");

        if (isActive) {
          // Close menu
          navLinks.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
          body.style.overflow = "";
        } else {
          // Open menu
          navLinks.classList.add("active");
          mobileMenuBtn.classList.add("active");
          body.style.overflow = "hidden";
        }

        // Toggle icon
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          if (isActive) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          } else {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
          }
        }
      });

      // Close menu when clicking on a link
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
          body.style.overflow = "";

          const icon = mobileMenuBtn.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
          if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            mobileMenuBtn.classList.remove("active");
            body.style.overflow = "";

            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
              icon.classList.add("fa-bars");
              icon.classList.remove("fa-times");
            }
          }
        }
      });

      // Close menu on window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
          body.style.overflow = "";

          const icon = mobileMenuBtn.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          }
        }
      });

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
          body.style.overflow = "";

          const icon = mobileMenuBtn.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          }
        }
      });
    }
  }

  // ========================================
  // SMOOTH SCROLLING
  // ========================================
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ========================================
  // FAQ ACCORDION
  // ========================================
  setupFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      if (question) {
        question.addEventListener("click", () => {
          const isActive = item.classList.contains("active");

          // Close all other FAQ items
          faqItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
          });

          // Toggle current item
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // ========================================
  // GALLERY LIGHTBOX
  // ========================================
  setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Create lightbox HTML
    const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close">&times;</button>
                    <img src="" alt="">
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", lightboxHTML);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    // Open lightbox on gallery item click
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // ========================================
  // STATS COUNTER ANIMATION
  // ========================================
  setupStatsCounter() {
    const statCounts = document.querySelectorAll(".stat-count");
    let hasAnimated = false;

    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute("data-target"));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, duration / steps);
    };

    const checkStatsInView = () => {
      if (hasAnimated) return;

      const statsSection = document.querySelector(".statistics");
      if (!statsSection) return;

      const rect = statsSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        hasAnimated = true;
        statCounts.forEach(animateCounter);
      }
    };

    window.addEventListener("scroll", checkStatsInView);
    checkStatsInView(); // Check on load
  }

  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  setupBackToTop() {
    const backToTopBtn = document.querySelector(".back-to-top");

    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  // ========================================
  // FORM SUBMISSION
  // ========================================
  setupFormSubmission() {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
          this.showNotification("Please fill in all required fields.", "error");
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          this.showNotification("Please enter a valid email address.", "error");
          return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {
          this.showNotification(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
  }

  // ========================================
  // SCROLL EFFECTS
  // ========================================
  setupScrollEffects() {
    const header = document.querySelector(".header");

    if (header) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
    }

    // Update active navigation link
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
          window.pageYOffset >= sectionTop &&
          window.pageYOffset < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        `;

    // Add notification styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background:
        type === "success"
          ? "#4CAF50"
          : type === "error"
          ? "#f44336"
          : "#2196F3",
      color: "white",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: "10000",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      maxWidth: "400px",
      animation: "slideInRight 0.3s ease",
    });

    // Style close button
    const closeBtn = notification.querySelector(".notification-close");
    Object.assign(closeBtn.style, {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "0",
      lineHeight: "1",
    });

    document.body.appendChild(notification);

    // Close notification
    const closeNotification = () => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    };

    closeBtn.addEventListener("click", closeNotification);
    setTimeout(closeNotification, 5000); // Auto close after 5 seconds
  }
}

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  new HappyKidsSchool();
});

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
