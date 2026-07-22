document.addEventListener("DOMContentLoaded", () => {
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
    const isOpen =
      mobileProductsTrigger.getAttribute("aria-expanded") === "true";

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
        const otherArrow = otherCategory.querySelector(
          ".mobile-category-arrow",
        );

        closeAccordion(otherContent, otherTrigger, otherArrow);
      });

      if (isOpen) {
        closeAccordion(content, trigger, arrow);
      } else {
        openAccordion(content, trigger, arrow);
      }
    });
  });
  // Mobile About Accordion
  const mobileAboutTrigger = document.querySelector(".mobile-about-trigger");
  const mobileAboutMenu = document.querySelector("#mobileAboutMenu");
  const mobileAboutArrow = document.querySelector(".mobile-about-arrow");

  mobileAboutTrigger?.addEventListener("click", () => {
    const isOpen = mobileAboutTrigger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeAccordion(mobileAboutMenu, mobileAboutTrigger, mobileAboutArrow);
    } else {
      openAccordion(mobileAboutMenu, mobileAboutTrigger, mobileAboutArrow);
    }
  });
});
