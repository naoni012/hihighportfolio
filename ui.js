(() => {
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Content reveal is independent from the Three.js CDN.
  const revealItems = qsa('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible', 'show');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible', 'show'));
  }

  // Fixed navigation state: communicate the current section without adding a second floating navigation.
  const headerLinks = qsa('.site-header .nav a');
  const headerSections = headerLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && headerSections.length) {
    const headerObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = `#${visible.target.id}`;
      headerLinks.forEach(link => {
        const active = link.getAttribute('href') === id;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-24% 0px -66% 0px', threshold: [0, .1, .35] });
    headerSections.forEach(section => headerObserver.observe(section));
  }

  // Project rail remains usable even if Three.js fails to load.
  const targetByProject = { danjo: '#danjo', hamon: '#hamon', resummer: '#summer' };
  qsa('.rail-item').forEach(button => {
    button.addEventListener('click', () => {
      if (window.__portfolioThreeReady) return;
      qsa('.rail-item').forEach(item => item.classList.toggle('active', item === button));
      const target = document.querySelector(targetByProject[button.dataset.project]);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Production document expander.
  qsa('.doc-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;
      const willOpen = target.hasAttribute('hidden');
      target.toggleAttribute('hidden', !willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
      button.innerHTML = willOpen
        ? '문서 접기 <span class="doc-toggle-icon">－</span>'
        : '제작 문서 더 보기 (4) <span class="doc-toggle-icon">＋</span>';
    });
  });

  // Image lightbox for document, character and environment sheets.
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  let lastFocused = null;

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (lightboxImage) lightboxImage.src = '';
    lastFocused?.focus?.();
  };

  const openLightbox = image => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lastFocused = document.activeElement;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    const figure = image.closest('figure');
    lightboxCaption.textContent = figure?.querySelector('figcaption')?.innerText?.trim() || image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightboxClose?.focus();
  };

  const zoomImages = [...new Set(qsa('[data-zoom], .doc-shot img, .dev-step img'))];
  zoomImages.forEach(image => {
    image.setAttribute('data-zoom', '');
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || '이미지'} 확대 보기`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
  });

  // Friendly fallback if the external 3D module is blocked.
  window.setTimeout(() => {
    const loading = document.querySelector('.stage-loading');
    if (loading && loading.isConnected) loading.textContent = 'INTERACTIVE PREVIEW';
  }, 5000);
})();
