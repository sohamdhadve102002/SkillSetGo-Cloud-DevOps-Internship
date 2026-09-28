const loader = document.querySelector('.loader');
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.dot-nav button'));
const prevBtn = document.querySelector('[data-slide="prev"]');
const nextBtn = document.querySelector('[data-slide="next"]');
const heroSlider = document.querySelector('.hero-slider');
const backToTop = document.querySelector('.back-to-top');
const year = document.getElementById('year');
const progressBar = document.getElementById('scroll-progress');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');
const reviewCards = Array.from(document.querySelectorAll('.review-slide-card'));
const reviewTrack = document.getElementById('review-track');
const reviewDots = Array.from(document.querySelectorAll('#review-dots button'));
const reviewPrev = document.querySelector('[data-review="prev"]');
const reviewNext = document.querySelector('[data-review="next"]');
const viewAllReviews = document.getElementById('view-all-reviews');
const reviewModal = document.getElementById('review-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalName = document.getElementById('modal-name');
const modalBody = document.getElementById('modal-body');
const reviewModalClose = document.querySelector('.modal-close');
let currentSlide = 0;
let currentReview = 0;
let slideTimer;

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loader?.classList.add('hidden');
  }, 500);
});

function updateSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentSlide);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });
}

function startAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    updateSlide(currentSlide + 1);
  }, 5000);
}

if (slides.length) {
  updateSlide(0);
  startAutoSlide();
}

prevBtn?.addEventListener('click', () => {
  updateSlide(currentSlide - 1);
  startAutoSlide();
});

nextBtn?.addEventListener('click', () => {
  updateSlide(currentSlide + 1);
  startAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateSlide(index);
    startAutoSlide();
  });
});

heroSlider?.addEventListener('mouseenter', () => clearInterval(slideTimer));
heroSlider?.addEventListener('mouseleave', startAutoSlide);

let touchStartX = 0;
heroSlider?.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
}, { passive: true });

heroSlider?.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const delta = touchEndX - touchStartX;
  if (delta > 60) updateSlide(currentSlide - 1);
  if (delta < -60) updateSlide(currentSlide + 1);
  startAutoSlide();
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
  backToTop?.classList.toggle('show', window.scrollY > 500);
  if (progressBar) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.width = `${percent}%`;
  }
});

navToggle?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));

function updateReviewSlide(index) {
  if (!reviewTrack || !reviewCards.length) return;
  currentReview = (index + reviewCards.length) % reviewCards.length;
  const card = reviewCards[currentReview];
  if (!card) return;
  const cardWidth = card.getBoundingClientRect().width + 16;
  reviewTrack.style.transform = `translateX(-${currentReview * cardWidth}px)`;
  reviewDots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentReview));
}

function openReviewModal(card) {
  if (!reviewModal || !card) return;
  const title = card.dataset.title || 'Client Review';
  const name = card.dataset.name || 'Happy Customer';
  const body = card.dataset.body || card.textContent;
  const image = card.dataset.image || '';
  modalTitle.textContent = title;
  modalName.textContent = name;
  modalBody.textContent = body;
  modalImage.src = image;
  modalImage.alt = title;
  reviewModal.classList.add('open');
  reviewModal.setAttribute('aria-hidden', 'false');
}

function closeReviewModal() {
  reviewModal?.classList.remove('open');
  reviewModal?.setAttribute('aria-hidden', 'true');
}

if (reviewCards.length) {
  reviewCards.forEach((card) => card.addEventListener('click', () => openReviewModal(card)));
  reviewPrev?.addEventListener('click', () => updateReviewSlide(currentReview - 1));
  reviewNext?.addEventListener('click', () => updateReviewSlide(currentReview + 1));
  reviewDots.forEach((dot, index) => dot.addEventListener('click', () => updateReviewSlide(index)));
  viewAllReviews?.addEventListener('click', () => {
    document.getElementById('review-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  reviewModalClose?.addEventListener('click', closeReviewModal);
  reviewModal?.addEventListener('click', (event) => {
    if (event.target === reviewModal) closeReviewModal();
  });
  window.addEventListener('resize', () => updateReviewSlide(currentReview));
  updateReviewSlide(0);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeReviewModal();
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = entry.target;
    const end = Number(target.dataset.count || 0);
    const suffix = target.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const value = Math.floor(progress * end);
      target.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObserver.unobserve(target);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = form.querySelectorAll('input, select, textarea');
  let valid = true;
  fields.forEach((field) => {
    if (!field.value.trim()) valid = false;
  });

  const email = form.querySelector('input[type="email"]');
  const phone = form.querySelector('input[name="phone"]');
  const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const phonePattern = /^[0-9+\-()\s]{7,15}$/;

  if (email && !emailPattern.test(email.value)) valid = false;
  if (phone && !phonePattern.test(phone.value)) valid = false;

  if (!valid) {
    formNote.textContent = 'Please complete all fields with a valid email and phone number.';
    formNote.className = 'error-message';
    return;
  }

  formNote.textContent = 'Thank you! Your service request has been received. Our team will contact you shortly.';
  formNote.className = 'success-message';
  form.reset();
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
