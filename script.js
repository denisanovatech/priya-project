// ==========================================================================
// DeNis Anova — Shared behaviour
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle ----------------------------------------------------*/
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* Contact modal ----------------------------------------------------------*/
  const modal = document.getElementById('contact-modal');
  const openTriggers = document.querySelectorAll('[data-open-contact]');
  const closeTriggers = document.querySelectorAll('[data-close-contact]');

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));
  closeTriggers.forEach(btn => btn.addEventListener('click', closeModal));

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* Contact form submit (front-end only, no backend) -----------------------*/
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.classList.add('show');
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = '';
          if (success) success.classList.remove('show');
        }, 300);
      }, 1800);
    });
  }

  /* Newsletter subscribe form ------------------------------------------------*/
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = subscribeForm.querySelector('input');
      const btn = subscribeForm.querySelector('button');
      const original = btn.innerHTML;
      btn.innerHTML = 'Subscribed ✓';
      input.value = '';
      setTimeout(() => { btn.innerHTML = original; }, 2200);
    });
  }

  /* Scroll reveal ------------------------------------------------------------*/
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* Header shadow on scroll --------------------------------------------------*/
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 6px 20px rgba(20,10,60,0.06)' : 'none';
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* Careers openings carousel arrow (simple horizontal scroll) --------------*/
  const track = document.querySelector('.openings-track');
  const nextBtn = document.querySelector('.openings-next');
  if (track && nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});
