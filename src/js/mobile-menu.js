const mobileMenu = document.querySelector('.js-menu');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-menu__close');
const backdropEl = document.querySelector('.header__backdrop');

const body = document.querySelector('body');

const toggleMenu = () => {
  const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('open');
  openMenuBtn.classList.toggle('open');
  backdropEl.classList.toggle('hidden');
  body.classList.toggle('scroll-disable');
  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};

// openMenuBtn.addEventListener('click', toggleMenu);
// closeMenuBtn.addEventListener('click', toggleMenu);
// backdropEl.addEventListener('click', toggleMenu);
