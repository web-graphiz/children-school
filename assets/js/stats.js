/**
 * Statistics Counter Animation
 */
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".statistics");
  const counters = document.querySelectorAll(".stat-count");
  let hasAnimated = false;

  // Function to animate number counting
  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 seconds for animation
      const increment = target / (duration / 16); // 60fps

      let currentCount = 0;
      const updateCounter = () => {
        currentCount += increment;
        if (currentCount < target) {
          counter.textContent = Math.ceil(currentCount);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      counter.classList.add("animate");
      updateCounter();
    });
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Check if stats section is in viewport and animate
  function checkScroll() {
    if (isInViewport(statsSection) && !hasAnimated) {
      animateCounters();
      hasAnimated = true;
    }
  }

  // Listen for scroll events
  window.addEventListener("scroll", checkScroll);

  // Check on initial load
  checkScroll();
});
