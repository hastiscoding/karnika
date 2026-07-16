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
