document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Menu

  const menuBtn = document.querySelector("#menuBtn");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileMenuClose = document.querySelector("#mobileMenuClose");
  const mobileMenuBackdrop = document.querySelector("#mobileMenuBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    mobileMenu.classList.remove("translate-x-full");

    mobileMenuBackdrop.classList.remove("invisible", "opacity-0");
    mobileMenuBackdrop.classList.add("visible", "opacity-100");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("translate-x-full");

    mobileMenuBackdrop.classList.remove("visible", "opacity-100");
    mobileMenuBackdrop.classList.add("invisible", "opacity-0");

    mobileMenu.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  }

  menuBtn.addEventListener("click", openMobileMenu);
  mobileMenuClose.addEventListener("click", closeMobileMenu);
  mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileMenu.getAttribute("aria-hidden") === "false"
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  // Mega-Menu

  // Hero-Swiper
  new Swiper(".heroSwiper", {
    loop: true,
    speed: 950,
    effect: "fade",
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".heroSwiper .swiper-pagination",
      clickable: true,
    },
  });

  // News-Swiper
  new Swiper(".newsSwiper", {
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: {
      nextEl: ".news-next",
      prevEl: ".news-prev",
    },
    pagination: {
      el: ".newsSwiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });

  // Article-Swiper
  new Swiper(".articleSwiper", {
    spaceBetween: 22,
    slidesPerView: 1,
    navigation: {
      nextEl: ".article-next",
      prevEl: ".article-prev",
    },
    pagination: {
      el: ".articleSwiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });

  // Reveal-Home-Sections-smoothly
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((item) => revealObserver.observe(item));

  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target);
        const duration = 1600;
        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * eased);
          el.textContent =
            value.toLocaleString("fa-IR") + (target >= 15 ? "+" : "");
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
});

// Awards-Swiper
const awardsSwiperElement = document.querySelector(".awardsSwiper");

if (awardsSwiperElement) {
  new Swiper(".awardsSwiper", {
    slidesPerView: 1.15,
    spaceBetween: 16,
    speed: 600,
    watchOverflow: true,
    grabCursor: true,

    // اسلایدر عمداً autoplay ندارد
    autoplay: false,

    navigation: {
      nextEl: ".awards-next",
      prevEl: ".awards-prev",
    },

    pagination: {
      el: ".awards-pagination",
      clickable: true,
    },

    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },

      1280: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
}

// Awards-and-Certifications-Modal
const certificateSwiper = new Swiper(".certificateSwiper", {
  slidesPerView: 1.15,
  spaceBetween: 16,
  speed: 700,
  grabCursor: true,
  watchOverflow: true,

  navigation: {
    nextEl: ".certificate-next",
    prevEl: ".certificate-prev",
  },

  pagination: {
    el: ".certificate-pagination",
    clickable: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

const certificateModal = document.getElementById("certificateModal");
const certificateModalContent = document.getElementById(
  "certificateModalContent",
);
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const certificateModalClose = document.getElementById("certificateModalClose");
const certificateModalBackdrop = document.getElementById(
  "certificateModalBackdrop",
);

function openCertificateModal(imageSrc, imageTitle) {
  certificateModalImage.src = imageSrc;
  certificateModalImage.alt = imageTitle;
  certificateModalTitle.textContent = imageTitle;

  certificateModal.classList.remove("hidden");
  certificateModal.classList.add("flex");

  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    certificateModalContent.classList.remove("scale-95", "opacity-0");
    certificateModalContent.classList.add("scale-100", "opacity-100");
  });
}

function closeCertificateModal() {
  certificateModalContent.classList.remove("scale-100", "opacity-100");
  certificateModalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    certificateModal.classList.remove("flex");
    certificateModal.classList.add("hidden");

    certificateModalImage.src = "";
    certificateModalTitle.textContent = "";
    document.body.style.overflow = "";
  }, 300);
}

document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("click", () => {
    const imageSrc = card.dataset.certificateImage;
    const imageTitle = card.dataset.certificateTitle;

    openCertificateModal(imageSrc, imageTitle);
  });
});

certificateModalClose.addEventListener("click", closeCertificateModal);
certificateModalBackdrop.addEventListener("click", closeCertificateModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && certificateModal.classList.contains("flex")) {
    closeCertificateModal();
  }
});

// Mobile Products Accordion
const mobileProductsTrigger = document.querySelector(
  ".mobile-products-trigger",
);
const mobileProductsMenu = document.querySelector("#mobileProductsMenu");
const mobileProductsArrow = document.querySelector(".mobile-products-arrow");

const mobileCategories = document.querySelectorAll(".mobile-category");

function openAccordion(content, trigger, arrow) {
  content.classList.remove("max-h-0", "opacity-0");
  content.classList.add("max-h-[1500px]", "opacity-100");

  trigger.setAttribute("aria-expanded", "true");
  arrow?.classList.add("rotate-180");
}

function closeAccordion(content, trigger, arrow) {
  content.classList.remove("max-h-[1500px]", "opacity-100");
  content.classList.add("max-h-0", "opacity-0");

  trigger.setAttribute("aria-expanded", "false");
  arrow?.classList.remove("rotate-180");
}

// Open/close the main Products accordion
mobileProductsTrigger?.addEventListener("click", () => {
  const isOpen = mobileProductsTrigger.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeAccordion(
      mobileProductsMenu,
      mobileProductsTrigger,
      mobileProductsArrow,
    );

    // Close every category when the main accordion closes
    mobileCategories.forEach((category) => {
      const trigger = category.querySelector(".mobile-category-trigger");
      const content = category.querySelector(".mobile-category-content");
      const arrow = category.querySelector(".mobile-category-arrow");

      closeAccordion(content, trigger, arrow);
    });
  } else {
    openAccordion(
      mobileProductsMenu,
      mobileProductsTrigger,
      mobileProductsArrow,
    );
  }
});

// Category accordions
mobileCategories.forEach((category) => {
  const trigger = category.querySelector(".mobile-category-trigger");
  const content = category.querySelector(".mobile-category-content");
  const arrow = category.querySelector(".mobile-category-arrow");

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    // Close all other categories
    mobileCategories.forEach((otherCategory) => {
      if (otherCategory === category) return;

      const otherTrigger = otherCategory.querySelector(
        ".mobile-category-trigger",
      );
      const otherContent = otherCategory.querySelector(
        ".mobile-category-content",
      );
      const otherArrow = otherCategory.querySelector(".mobile-category-arrow");

      closeAccordion(otherContent, otherTrigger, otherArrow);
    });

    if (isOpen) {
      closeAccordion(content, trigger, arrow);
    } else {
      openAccordion(content, trigger, arrow);
    }
  });
});
