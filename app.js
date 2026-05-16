/* ═══════════════════════════════════════════════════════════
   POWERFORGE GYM — APP.JS
   Performance-first · Mobile-optimized · No dependencies
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── 1. Lazy Image Loading ──────────────────────────────────────
(function initLazyLoad() {
  // Use native lazy loading where available
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.loading = 'lazy';
    });
    
    // Still use IntersectionObserver for performance monitoring
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            if (img.dataset.src && !img.src) {
              img.src = img.dataset.src;
              img.style.display = 'block';
            }
            if (img.dataset.src) {
              const onLoad = () => {
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                // Mark parent containers as loaded for shimmer animation
                const parent = img.closest('.gallery-item, .trainer-img-wrap, .video-thumb, .trans-side, .ig-post');
                if (parent) parent.classList.add('loaded');
              };
              img.addEventListener('load', onLoad, { once: true });
              img.addEventListener('error', onLoad, { once: true });
              obs.unobserve(img);
            }
          });
        },
        { rootMargin: '400px 0px', threshold: 0 }
      );
      
      document.querySelectorAll('img.lazy[data-src]').forEach(img => observer.observe(img));
    }
    return;
  }

  // Fallback for older browsers
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('img.lazy').forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
      img.classList.add('loaded');
      const parent = img.closest('.gallery-item, .trainer-img-wrap, .video-thumb, .trans-side, .ig-post');
      if (parent) parent.classList.add('loaded');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          const onLoad = () => {
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            // Mark parent containers as loaded for shimmer animation
            const parent = img.closest('.gallery-item, .trainer-img-wrap, .video-thumb, .trans-side, .ig-post');
            if (parent) parent.classList.add('loaded');
          };
          img.addEventListener('load', onLoad, { once: true });
          img.addEventListener('error', onLoad, { once: true });
        }
        obs.unobserve(img);
      });
    },
    { rootMargin: '400px 0px', threshold: 0.01 }
  );

  document.querySelectorAll('img.lazy').forEach(img => observer.observe(img));
})();

// ── 2. Scroll-reveal Animation ────────────────────────────────
(function initReveal() {
  const revealEls = [
    '.about-card', '.trainer-card', '.trans-card', '.review-card',
    '.video-card', '.why-item', '.plan-card', '.ig-post',
    '.section-title', '.section-label', '.hero-stats', '.hero-actions'
  ];

  // Mark elements for reveal
  revealEls.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
    });
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// ── 3. Navigation ─────────────────────────────────────────────
(function initNav() {
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const menu     = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  // Scroll state
  let lastScroll = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    lastScroll = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !nav.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

// ── 4. Gallery Filter ─────────────────────────────────────────
(function initGallery() {
  const tabs  = document.querySelectorAll('.gtab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;

      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter items
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

// ── 5. BMI Calculator ─────────────────────────────────────────
(function initBMI() {
  const metricBtn   = document.getElementById('metricBtn');
  const imperialBtn = document.getElementById('imperialBtn');
  const metricIn    = document.getElementById('metricInputs');
  const imperialIn  = document.getElementById('imperialInputs');
  const calcBtn     = document.getElementById('calcBmi');
  const result      = document.getElementById('bmiResult');
  const bmiNumber   = document.getElementById('bmiNumber');
  const bmiCat      = document.getElementById('bmiCategory');
  const bmiAdvice   = document.getElementById('bmiAdvice');
  const marker      = document.getElementById('scaleMarker');

  let isMetric = true;

  metricBtn.addEventListener('click', () => {
    isMetric = true;
    metricBtn.classList.add('active');
    imperialBtn.classList.remove('active');
    metricIn.classList.remove('hidden');
    imperialIn.classList.add('hidden');
  });

  imperialBtn.addEventListener('click', () => {
    isMetric = false;
    imperialBtn.classList.add('active');
    metricBtn.classList.remove('active');
    imperialIn.classList.remove('hidden');
    metricIn.classList.add('hidden');
  });

  const bmiInfo = {
    underweight: {
      label: 'Underweight',
      color: '#3498DB',
      advice: '⚠️ Your BMI suggests you may be underweight. Our trainers can help you build lean muscle with structured strength training and a personalised nutrition plan to reach a healthy weight safely.',
      markerPct: 12
    },
    normal: {
      label: 'Healthy Weight ✓',
      color: '#27AE60',
      advice: '🎯 Great news — you\'re in a healthy BMI range! The best next step is maintaining it with strength training and cardio. Our Pro plan is perfect for taking your fitness to the next level.',
      markerPct: 35
    },
    overweight: {
      label: 'Overweight',
      color: '#F39C12',
      advice: '💪 You\'re in the overweight range, but the good news is this is very achievable to change. Our transformation members in this range typically see major results within 3–4 months with the right plan.',
      markerPct: 62
    },
    obese: {
      label: 'Obese',
      color: '#E74C3C',
      advice: '🔴 Your BMI is in the obese range. This is where personalised coaching makes the biggest difference. Our trainers specialise in safe, sustainable transformations — even from a high starting point.',
      markerPct: 85
    }
  };

  calcBtn.addEventListener('click', () => {
    let weight, height;

    if (isMetric) {
      weight = parseFloat(document.getElementById('weight-kg').value);
      height = parseFloat(document.getElementById('height-cm').value) / 100;
    } else {
      const lb = parseFloat(document.getElementById('weight-lb').value);
      const inch = parseFloat(document.getElementById('height-in').value);
      weight = lb * 0.453592;
      height = inch * 0.0254;
    }

    if (!weight || !height || weight <= 0 || height <= 0) {
      showToast('⚠️ Please enter valid weight and height');
      return;
    }

    const bmi = weight / (height * height);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let cat;
    if (bmi < 18.5)     cat = 'underweight';
    else if (bmi < 25)  cat = 'normal';
    else if (bmi < 30)  cat = 'overweight';
    else                cat = 'obese';

    const info = bmiInfo[cat];

    bmiNumber.textContent = bmiRounded;
    bmiCat.textContent = info.label;
    bmiCat.style.color = info.color;
    bmiAdvice.textContent = info.advice;
    document.querySelector('.bmi-circle').style.borderColor = info.color;

    // Position marker
    if (marker) {
      marker.style.position = 'relative';
      if (!marker._after) {
        // CSS handles the ::after — use a span instead
        marker.innerHTML = `<span style="
          position:absolute;
          left:${info.markerPct}%;
          transform:translateX(-50%);
          font-size:.75rem;
          color:#fff;
          transition:left .5s cubic-bezier(.22,1,.36,1);
        ">▲</span>`;
        marker._after = marker.querySelector('span');
      } else {
        marker._after.style.left = `${info.markerPct}%`;
      }
    }

    result.classList.remove('hidden');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Allow Enter key
  document.querySelectorAll('#bmiResult ~ *, .bmi-inputs input, #bmi-age').forEach(input => {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') calcBtn.click();
    });
  });

  document.querySelectorAll('.bmi-inputs input, #bmi-age').forEach(input => {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') calcBtn.click();
    });
  });
})();

// ── 6. Video Modal ────────────────────────────────────────────
(function initVideoModal() {
  const modal    = document.getElementById('videoModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const cards    = document.querySelectorAll('.video-card');

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  cards.forEach(card => {
    card.addEventListener('click', openModal);
    // Keyboard
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal();
    });
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

// ── 7. Floating CTA ───────────────────────────────────────────
(function initFloatingCTA() {
  const cta = document.getElementById('floatingCta');
  if (!cta) return;

  const joinSection = document.getElementById('join');

  const update = () => {
    const scrolled = window.scrollY > 300;
    let pastJoin = false;
    if (joinSection) {
      const rect = joinSection.getBoundingClientRect();
      pastJoin = rect.bottom < 0;
    }
    cta.classList.toggle('visible', scrolled && !pastJoin);
    cta.setAttribute('aria-hidden', String(!scrolled || pastJoin));
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── 8. Contact Form ───────────────────────────────────────────
(function initForm() {
  const btn = document.getElementById('formSubmit');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = document.getElementById('fname')?.value.trim();
    const email = document.getElementById('femail')?.value.trim();
    const phone = document.getElementById('fphone')?.value.trim();
    const goal  = document.getElementById('fgoal')?.value;

    if (!name) { showToast('⚠️ Please enter your name'); return; }
    if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email'); return; }
    if (!phone) { showToast('⚠️ Please enter your phone number'); return; }
    if (!goal)  { showToast('⚠️ Please select your goal'); return; }

    // Simulate success
    btn.textContent = '✓ Request Sent!';
    btn.disabled = true;
    btn.style.background = '#27AE60';
    showToast('🎉 We\'ll be in touch within 24 hours!');

    setTimeout(() => {
      btn.textContent = 'Claim My Free Week →';
      btn.disabled = false;
      btn.style.background = '';
      ['fname','femail','fphone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('fgoal').value = '';
    }, 5000);
  });
})();

// ── 9. Instagram post click ───────────────────────────────────
(function initIG() {
  document.querySelectorAll('.ig-post').forEach(post => {
    post.setAttribute('tabindex', '0');
    post.setAttribute('role', 'link');
    post.setAttribute('aria-label', 'View on Instagram');
    post.addEventListener('click', () => {
      window.open('https://instagram.com/powerforgegym', '_blank', 'noopener,noreferrer');
    });
    post.addEventListener('keypress', e => {
      if (e.key === 'Enter') post.click();
    });
  });
})();

// ── 10. Toast Helper ──────────────────────────────────────────
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

// ── 11. Performance: Hero parallax (only on desktop, reduce-motion safe) ──
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return; // skip on mobile for performance

  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        heroImg.style.transform = `translateY(${y * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── 12. Active nav link highlight on scroll ───────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            link.style.color = active ? 'var(--red)' : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => obs.observe(s));
})();

// ── 13. BMI input enter key ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const bmiInputs = document.querySelectorAll('.bmi-inputs input, #bmi-age');
  bmiInputs.forEach(inp => {
    inp.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        document.getElementById('calcBmi')?.click();
      }
    });
  });
});

// ── 14. Preload next section images on scroll ─────────────────
(function prefetchOnScroll() {
  let done = false;
  window.addEventListener('scroll', () => {
    if (done || window.scrollY < 200) return;
    done = true;
    // Preconnect to unsplash for faster subsequent loads
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://images.unsplash.com';
    document.head.appendChild(link);
  }, { once: true, passive: true });
})();

// ── 15. Smooth back-to-top on logo click ─────────────────────
document.querySelector('.nav-logo')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
