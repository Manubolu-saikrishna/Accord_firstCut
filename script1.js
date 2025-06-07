/***********************************
 * ACCORDION TOGGLE FUNCTIONALITY
 ***********************************/
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Toggle active class on button
    this.classList.toggle("active");

    // Toggle the corresponding panel visibility
    var panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
}

/***********************************
 * SCROLLABLE THUMBNAIL GALLERY ARROWS
 ***********************************/
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-gallery");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const scrollAmount = scrollContainer.offsetWidth / 3; // Approx. one thumbnail width

  // Scroll left on arrow click
  leftArrow?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Scroll right on arrow click
  rightArrow?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

/***********************************
 * SECTION ENTRY ANIMATIONS ON SCROLL
 ***********************************/
document.addEventListener("DOMContentLoaded", () => {
  // Select all sections and .hero-text-section EXCEPT .nav
  const sections = Array.from(
    document.querySelectorAll("section, .hero-text-section")
  ).filter((el) => !el.classList.contains("nav"));

  // List of possible animations from Animate.css
  const animations = [
    "animate__fadeIn",
    "animate__fadeInDown",
    "animate__fadeInLeft",
    "animate__fadeInRight",
    "animate__fadeInUp",
    "animate__zoomIn",
    "animate__bounceIn",
    "animate__flipInX",
    "animate__flipInY",
    "animate__slideInUp",
    "animate__slideInDown",
    "animate__slideInLeft",
    "animate__slideInRight",
  ];

  // IntersectionObserver triggers when sections scroll into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply a random animation
          const randomAnimation =
            animations[Math.floor(Math.random() * animations.length)];
          entry.target.classList.add("animate__animated", randomAnimation);

          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each section
  sections.forEach((section) => observer.observe(section));
});

/***********************************
 * ANIMATED COUNTER FOR NUMBERS
 ***********************************/
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-number");

  // Function to animate a counter from 0 to target value
  const animateCount = (el) => {
    const target = +el.getAttribute("data-target");
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);
      el.textContent = `${currentCount}+`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}+`;
      }
    };

    requestAnimationFrame(update);
  };

  // IntersectionObserver for triggering count when in view
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target); // Count only once
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  // Observe each counter element
  counters.forEach((el) => observer.observe(el));
});

// -------------------------
// NEW: Back to Top Button Functionality with Scroll Progress Indicator
// -------------------------
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  const progressBar = backToTopBtn.querySelector(".progress-bar");
  const circumference = 2 * Math.PI * 20; // circle circumference (r=20)
  const scrollShowPosition = 300; // show button after 300px scroll

  function updateButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / docHeight, 1);

    // Show or hide button
    backToTopBtn.style.display =
      scrollTop > scrollShowPosition ? "flex" : "none";

    // Update progress stroke offset
    if (progressBar) {
      const offset = circumference * (1 - scrollPercent);
      progressBar.style.strokeDashoffset = offset;
    }
  }

  // Scroll smoothly to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Listen to scroll event
  window.addEventListener("scroll", updateButton);

  // Initialize button state
  updateButton();
}
