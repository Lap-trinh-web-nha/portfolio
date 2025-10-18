// script.js - multi-page friendly
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current filename
  const links = document.querySelectorAll('.nav-link');
  const path = location.pathname.split('/').pop().toLowerCase() || 'index.html';

  links.forEach(a => {
    const href = a.getAttribute('href').toLowerCase();
    // If href is full file (index.html, education.html, contact.html)
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // If you're on index.html and using internal anchors (like #introduction),
  // allow smooth scrolling for links that start with '#'
  const main = document.getElementById('mainContent');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#') && main) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          main.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
      });
    }
  });

  // Optional: if on index page, set active link while scrolling inside mainContent
  if (main && location.pathname.split('/').pop().toLowerCase().includes('index')) {
    const sections = document.querySelectorAll('.snap-section');
    const setActive = () => {
      const scrollTop = main.scrollTop;
      let closest = sections[0];
      let minDist = Math.abs(sections[0].offsetTop - scrollTop);
      sections.forEach(s => {
        const d = Math.abs(s.offsetTop - scrollTop);
        if (d < minDist) { minDist = d; closest = s; }
      });
      links.forEach(a => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          a.classList.toggle('active', href === ('#' + closest.id));
        }
      });
    };

    let ticking = false;
    main.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setActive();
          ticking = false;
        });
        ticking = true;
      }
    });
    // init
    setActive();
  }
});
