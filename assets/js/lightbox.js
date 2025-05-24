/**
 * Simple Lightbox implementation for Happy Kids School Gallery
 */
document.addEventListener("DOMContentLoaded", function () {
  // Create lightbox container
  const lightboxContainer = document.createElement("div");
  lightboxContainer.className = "lightbox";
  lightboxContainer.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image">
            <div class="lightbox-caption"></div>
            <div class="lightbox-controls">
                <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
  document.body.appendChild(lightboxContainer);

  // Get lightbox elements
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  // Get all gallery images
  const galleryImages = document.querySelectorAll(".gallery-image");
  let currentIndex = 0;

  // Add click event to gallery images
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", function () {
      currentIndex = index;
      const src = this.src;
      const alt = this.alt;

      // Show the lightbox with the clicked image
      lightbox.classList.add("active");
      lightboxImage.src = src;
      lightboxCaption.textContent = alt;

      // Disable scroll on body when lightbox is open
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Previous image
  lightboxPrev.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxCaption.textContent = galleryImages[currentIndex].alt;
  });

  // Next image
  lightboxNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxCaption.textContent = galleryImages[currentIndex].alt;
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.key === "ArrowLeft") {
      lightboxPrev.click();
    } else if (e.key === "ArrowRight") {
      lightboxNext.click();
    }
  });
});
