(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 스크롤 진행 바 ---------- */
  var bar = document.querySelector('.scroll-progress span');
  if (bar) {
    var ticking = false;
    var updateBar = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  /* ---------- 2. 숫자 카운트업 ---------- */
  var nums = [].slice.call(document.querySelectorAll('.stat-num[data-count]'));
  if (nums.length) {
    if (reduced) {
      // 모션 최소화 설정이면 최종값을 그대로 둔다 (HTML에 이미 최종값이 있음)
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          countIO.unobserve(el);

          var target = parseFloat(el.getAttribute('data-count'));
          var suffix = el.getAttribute('data-suffix') || '';
          var format = el.getAttribute('data-format');
          var finalText = el.textContent;
          if (isNaN(target)) return;

          var duration = 900;
          var start = null;

          var step = function (ts) {
            if (start === null) start = ts;
            var p = Math.min(1, (ts - start) / duration);
            var eased = 1 - Math.pow(1 - p, 3);
            var value = target * eased;

            if (format === 'time') {
              var mins = Math.floor(value);
              var secs = Math.round((value - mins) * 100);
              el.textContent = mins + "'" + (secs < 10 ? '0' + secs : secs) + '"';
            } else {
              el.textContent = Math.round(value) + suffix;
            }

            if (p < 1) {
              window.requestAnimationFrame(step);
            } else {
              el.textContent = finalText;
            }
          };

          el.textContent = format === 'time' ? '0\'00"' : '0' + suffix;
          window.requestAnimationFrame(step);
        });
      }, { threshold: 0.6 });

      nums.forEach(function (el) { countIO.observe(el); });
    }
  }

  /* ---------- 3. 순차 등장(스태거) ---------- */
  var staggerTargets = [].slice.call(
    document.querySelectorAll('.stat-row, .project-snapshot, .dev-row, .cap-cards, .skill-grid, .proposal-grid, .doc-grid')
  );
  staggerTargets.forEach(function (el) { el.classList.add('stagger'); });

  if (staggerTargets.length) {
    if (reduced) {
      staggerTargets.forEach(function (el) { el.classList.add('in'); });
    } else {
      var stagIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          stagIO.unobserve(entry.target);
        });
      }, { threshold: 0.2 });
      staggerTargets.forEach(function (el) { stagIO.observe(el); });
    }
  }

  /* ---------- 4. 이미지 패럴랙스 ---------- */
  if (!reduced) {
    var parallaxEls = [].slice.call(
      document.querySelectorAll('.media-bleed .video-embed, .key-visual img, .set-grid img')
    );
    parallaxEls.forEach(function (el) { el.setAttribute('data-parallax', ''); });

    if (parallaxEls.length) {
      var pTicking = false;
      var runParallax = function () {
        var vh = window.innerHeight;
        parallaxEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          var center = rect.top + rect.height / 2;
          var offset = (center - vh / 2) / vh;
          el.style.transform = 'translate3d(0,' + (offset * -14).toFixed(2) + 'px,0)';
        });
        pTicking = false;
      };
      window.addEventListener('scroll', function () {
        if (!pTicking) { pTicking = true; window.requestAnimationFrame(runParallax); }
      }, { passive: true });
      window.addEventListener('resize', runParallax, { passive: true });
      runParallax();
    }
  }
})();
