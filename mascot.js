(function () {
  'use strict';

  var mascot = document.getElementById('mascot');
  var bubble = document.getElementById('mascot-bubble');
  if (!mascot || !bubble) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lines = {
    danjo:    '모션캡처가 멈춘 날의 기록',
    hamon:    '안녕, 내가 하몽이야',
    summer:   '종이 나비를 따라가 볼까',
    about:    '여기까지 와줘서 고마워',
    proposal: '같이 만들면 더 재밌을 텐데',
    contact:  '메일 한 통이면 시작'
  };

  var current = '';

  function say(text) {
    if (!text || text === current) return;
    current = text;
    bubble.classList.remove('is-on');
    window.setTimeout(function () {
      bubble.textContent = text;
      bubble.classList.add('is-on');
    }, 180);
    window.clearTimeout(say._t);
    say._t = window.setTimeout(function () {
      bubble.classList.remove('is-on');
      current = '';
    }, 3600);
  }

  /* 히어로를 지나면 등장 */
  var hero = document.getElementById('top');
  if (hero && 'IntersectionObserver' in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        mascot.classList.toggle('is-visible', !e.isIntersecting);
      });
    }, { threshold: 0.35 });
    heroIO.observe(hero);
  } else {
    mascot.classList.add('is-visible');
  }

  /* 섹션에 들어올 때 한 마디 */
  if ('IntersectionObserver' in window && !reduced) {
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        say(lines[e.target.id]);
      });
    }, { threshold: 0.45 });

    Object.keys(lines).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionIO.observe(el);
    });
  }

  /* 클릭하면 해당 프로젝트로 */
  mascot.style.pointerEvents = 'auto';
  mascot.setAttribute('role', 'link');
  mascot.setAttribute('tabindex', '0');
  mascot.setAttribute('aria-label', '하몽 프로젝트로 이동');
  mascot.removeAttribute('aria-hidden');

  var goHamon = function () {
    var t = document.getElementById('hamon');
    if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
  mascot.addEventListener('click', goHamon);
  mascot.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHamon(); }
  });
})();
