(() => {
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal
  const revealItems = qsa('[data-reveal]');
  if (!('IntersectionObserver' in window) || reducedMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach(item => observer.observe(item));
  }

  // Active navigation
  const navLinks = qsa('.menu-nav a');
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const href = `#${visible.target.id}`;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === href) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -68% 0px', threshold: [0, .05, .25] });
    sections.forEach(section => navObserver.observe(section));
  }

  // Summer visual-system tabs
  const tabButtons = qsa('[role="tab"]');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const list = button.closest('[role="tablist"]');
      if (!list) return;
      const windowRoot = list.closest('.system-window');
      qsa('[role="tab"]', list).forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
      qsa('[role="tabpanel"]', windowRoot).forEach(panel => {
        const active = panel.id === button.getAttribute('aria-controls');
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    });
  });

  // Image lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeButton = lightbox?.querySelector('.lightbox-close');
  let lastFocus = null;

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (lightboxImage) lightboxImage.src = '';
    lastFocus?.focus?.();
  };

  qsa('[data-zoom]').forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || '이미지'} 확대 보기`);
    const open = () => {
      if (!lightbox || !lightboxImage) return;
      lastFocus = document.activeElement;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeButton?.focus();
    };
    image.addEventListener('click', open);
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
  closeButton?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
  });

  // Subtle desktop-window tilt. Kept intentionally small for readability.
  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    qsa('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--tilt-y', `${(x * 3.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-x', `${(-y * 3.2).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--tilt-x', '0deg');
      });
    });
  }

  // CSS-only Danjo background gets lightweight generated sparks.
  const emberField = document.querySelector('.ember-field');
  if (emberField && !reducedMotion) {
    for (let i = 0; i < 24; i += 1) {
      const ember = document.createElement('i');
      ember.className = 'ember';
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.bottom = `${-10 + Math.random() * 28}%`;
      ember.style.setProperty('--dur', `${5 + Math.random() * 7}s`);
      ember.style.setProperty('--drift', `${-45 + Math.random() * 90}px`);
      ember.style.animationDelay = `${-Math.random() * 9}s`;
      ember.style.transform = `scale(${.55 + Math.random() * 1.3})`;
      emberField.appendChild(ember);
    }
  }

  // Hamon environment responds slightly to the pointer without compromising text.
  const hamon = document.querySelector('.theme-hamon');
  if (hamon && !reducedMotion && matchMedia('(pointer:fine)').matches) {
    hamon.addEventListener('pointermove', event => {
      const rect = hamon.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 14;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 8;
      hamon.style.setProperty('--world-x', `${x.toFixed(1)}px`);
      hamon.style.setProperty('--world-y', `${y.toFixed(1)}px`);
    });
    hamon.addEventListener('pointerleave', () => {
      hamon.style.setProperty('--world-x', '0px');
      hamon.style.setProperty('--world-y', '0px');
    });
  }
})();
