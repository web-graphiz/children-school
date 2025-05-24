/**
 * FAQ Functionality for Happy Kids School
 */
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const toggle = item.querySelector(".faq-toggle");

    question.addEventListener("click", () => {
      // Close other open FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherToggle = otherItem.querySelector(".faq-toggle i");
          otherToggle.className = "fas fa-plus";
        }
      });

      // Toggle current FAQ item
      item.classList.toggle("active");
      const icon = toggle.querySelector("i");

      if (item.classList.contains("active")) {
        icon.className = "fas fa-minus";
      } else {
        icon.className = "fas fa-plus";
      }
    });

    // Keyboard accessibility
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});
