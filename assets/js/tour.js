/**
 * Virtual Tour Functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  const tourThumbnails = document.querySelectorAll(".tour-thumbnail");
  const tourVideo = document.getElementById("tour-video-frame");

  // Array of video IDs for virtual tour
  const tourVideos = [
    "ScMzIvxBSi4", // Replace with actual video IDs
    "dQw4w9WgXcQ", // These are placeholder YouTube video IDs
    "QH2-TGUlwu4", // Replace with actual school tour videos
  ];

  // Set first thumbnail as active by default
  if (tourThumbnails.length > 0) {
    tourThumbnails[0].classList.add("active");
  }

  // Add click event to thumbnails
  tourThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      // Update active class
      tourThumbnails.forEach((thumb) => thumb.classList.remove("active"));
      this.classList.add("active");

      // Update iframe source
      if (tourVideo && index < tourVideos.length) {
        tourVideo.src = `https://www.youtube.com/embed/${tourVideos[index]}?autoplay=1&rel=0`;

        // Update aria-label for accessibility
        const videoTitle =
          this.getAttribute("data-title") || `Tour video ${index + 1}`;
        tourVideo.setAttribute(
          "aria-label",
          `Virtual tour video: ${videoTitle}`
        );
      }
    });

    // Keyboard accessibility
    thumbnail.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Lazy load iframe when section is in view
  const tourSection = document.querySelector(".virtual-tour");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        tourVideo &&
        tourVideo.getAttribute("data-src")
      ) {
        tourVideo.src = tourVideo.getAttribute("data-src");
        tourVideo.removeAttribute("data-src");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  if (tourSection) {
    observer.observe(tourSection);
  }
});
