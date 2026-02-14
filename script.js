const animatedElements = document.querySelectorAll('[data-animate]');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.18 }
);

animatedElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;
  revealObserver.observe(element);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { rootMargin: '-40% 0px -45% 0px', threshold: 0.01 }
);

sections.forEach((section) => navObserver.observe(section));
