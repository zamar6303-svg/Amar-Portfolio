// ==========================================
// ROYAL GOLD LUXURY PORTFOLIO
// Advanced JavaScript - Amar Zahid
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. ANIMATED TYPING TEXT
  const typingText = document.querySelector(".typing-text");

  if (typingText) {
    const words = [
      "AI Creator",
      "Data Science Student",
      "Digital Innovator",
      "Creative Thinker",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingText.textContent = currentWord.substring(0, charIndex);

      let speed = deleting ? 55 : 100;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1200;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // 2. CUSTOM GOLD CURSOR
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    document.addEventListener("mousemove", (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      cursorOutline.style.left = `${e.clientX}px`;
      cursorOutline.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .skill-card",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
      });
    });
  }

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // 4. MOBILE NAVIGATION MENU
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  // 5. BACK TO TOP BUTTON
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 6. PROJECT CARD INTERACTIONS
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 25;
      const rotateY = (x - centerX) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
  // 7. ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll("#navLinks a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navigationLinks.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 8. AUTOMATIC FOOTER YEAR
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // 9. PAGE LOADED
  document.body.classList.add("page-loaded");

  console.log("Royal Gold Portfolio is ready! 👑");
});
