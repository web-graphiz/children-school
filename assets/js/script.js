// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle with animation
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("show");
      // Change icon on toggle
      const menuIcon = mobileMenuBtn.querySelector("i");
      if (navLinks.classList.contains("show")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  }

  // Enhanced mobile menu functionality
  if (mobileMenuBtn && navLinks) {
    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
          const menuIcon = mobileMenuBtn.querySelector("i");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        const menuIcon = mobileMenuBtn.querySelector("i");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        mobileMenuBtn.focus(); // Return focus to menu button
      }
    });

    // Improve keyboard navigation in mobile menu
    navLinks.addEventListener("keydown", function (e) {
      const focusableElements = navLinks.querySelectorAll("a");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // Add scroll animation to header
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Optimize scroll performance with throttling
  let scrollTimer = null;
  const originalScrollHandler = window.addEventListener;

  // Enhanced scroll handler for header
  function handleHeaderScroll() {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(() => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, 10);
  }

  // Replace the existing scroll event listener for header
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // Enhanced active section tracking with debounce
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  // Debounce function to improve scroll performance
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Improved method to determine which section is in view
  const updateActiveMenu = debounce(() => {
    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Get the header height to use as offset
    const headerHeight = document.querySelector("header").offsetHeight;

    // Threshold - how much of the section needs to be visible
    const threshold = 0.3;

    // Check each section to see if it's currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const sectionBottom = sectionTop + sectionHeight;

      // Calculate the viewport height
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is in view
      const visibleSectionTop = Math.max(0, sectionTop - scrollPosition);
      const visibleSectionBottom = Math.min(
        viewportHeight,
        sectionBottom - scrollPosition
      );
      const visibleHeight = Math.max(
        0,
        visibleSectionBottom - visibleSectionTop
      );

      // Calculate visibility percentage
      const visibilityPercentage = visibleHeight / viewportHeight;

      // Check if section is visible enough and within viewport
      if (
        (scrollPosition >= sectionTop - 100 &&
          scrollPosition < sectionBottom) ||
        visibilityPercentage > threshold
      ) {
        // Remove active class from all nav items
        navItems.forEach((item) => {
          item.classList.remove("active");
        });

        // Add active class to current section's nav item
        const activeNavItem = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        if (activeNavItem) {
          activeNavItem.classList.add("active");

          // Announce for screen readers (accessibility)
          activeNavItem.setAttribute("aria-current", "true");

          // Add a visual indicator that the section has become active
          section.classList.add("section-in-view");

          // Optional: scroll into view if needed on smaller screens
          if (window.innerWidth < 768) {
            const navContainer = document.querySelector(".nav-links");
            if (navContainer && !navContainer.classList.contains("show")) {
              activeNavItem.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }
        }
      } else {
        // Remove the section-in-view class when no longer in view
        section.classList.remove("section-in-view");

        // Remove aria-current attribute
        const inactiveNavItem = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        if (inactiveNavItem) {
          inactiveNavItem.removeAttribute("aria-current");
        }
      }
    });
  }, 100);

  // Run on scroll
  window.addEventListener("scroll", updateActiveMenu);

  // Also run on resize to handle viewport changes
  window.addEventListener("resize", updateActiveMenu);

  // Run on page load
  updateActiveMenu();

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
        }
      }
    });
  });

  // Animation on scroll - enhanced version
  const animateElements = document.querySelectorAll(
    ".animate-on-scroll, .section-header, .feature-card, .program-card, .gallery-item, .team-member, .testimonial"
  );

  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;

    animateElements.forEach((element, index) => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;

      // Check if element is in viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        // Add different animation classes based on element type
        if (element.classList.contains("feature-card")) {
          element.style.transitionDelay = `${index * 0.1}s`;
          element.classList.add("animate-feature");
        } else if (element.classList.contains("section-header")) {
          element.classList.add("animate-header");
        } else if (element.classList.contains("gallery-item")) {
          element.style.transitionDelay = `${index * 0.1}s`;
          element.classList.add("animate-gallery");
        } else {
          element.classList.add("visible");
        }
      }
    });
  }

  // Initial check and event listener for scroll
  window.addEventListener("scroll", checkIfInView);
  checkIfInView(); // Check on initial load

  // Gallery image hover effects with dynamic loading
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const img = item.querySelector("img");

    if (img) {
      // Add loading animation
      img.addEventListener("load", function () {
        item.classList.add("loaded");
      });

      // Add error handling
      img.addEventListener("error", function () {
        item.style.backgroundColor = "#f8f9fa";
        const errorText = document.createElement("div");
        errorText.className = "image-error";
        errorText.innerHTML =
          '<i class="fas fa-image"></i><p>Image not available</p>';
        item.appendChild(errorText);
      });
    }
  });

  // Form validation
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation for demonstration
      let valid = true;
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      if (!nameInput.value.trim()) {
        valid = false;
        nameInput.style.borderColor = "red";
        showFormError(nameInput, "Please enter your name");
      } else {
        nameInput.style.borderColor = "#ddd";
        removeFormError(nameInput);
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        valid = false;
        emailInput.style.borderColor = "red";
        showFormError(emailInput, "Please enter a valid email address");
      } else {
        emailInput.style.borderColor = "#ddd";
        removeFormError(emailInput);
      }

      if (!messageInput.value.trim()) {
        valid = false;
        messageInput.style.borderColor = "red";
        showFormError(messageInput, "Please enter your message");
      } else {
        messageInput.style.borderColor = "#ddd";
        removeFormError(messageInput);
      }

      if (valid) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Message sent successfully! We will get back to you soon.';

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.style.opacity = "0";
          setTimeout(() => {
            contactForm.removeChild(successMessage);
          }, 300);
        }, 3000);
      }
    });
  }

  // Helper functions
  function showFormError(element, message) {
    // Remove any existing error
    removeFormError(element);

    // Create error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    errorDiv.textContent = message;

    // Insert after the element
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
  }

  function removeFormError(element) {
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.className === "form-error") {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }

  // Email validation helper function
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Newsletter form validation
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = "red";
      } else {
        emailInput.style.borderColor = "#ddd";

        // Create success message
        const successMsg = document.createElement("div");
        successMsg.className = "newsletter-success";
        successMsg.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for subscribing!';

        newsletterForm.appendChild(successMsg);
        newsletterForm.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMsg.style.opacity = "0";
          setTimeout(() => {
            newsletterForm.removeChild(successMsg);
          }, 300);
        }, 3000);
      }
    });
  }
});
