document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const menuBtn = document.querySelector("#menuBtn");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileLinks = mobileMenu.querySelectorAll("a");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i data-lucide="menu"></i>'
      : '<i data-lucide="x"></i>';
    lucide.createIcons();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

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

// Awards Swiper
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

// Awards Modal

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
