const arrowEl = document.querySelector('.hero__circle');

arrowEl.addEventListener('click', () => {
  document.querySelector('.advantages').scrollIntoView({
    behavior: 'smooth',
  });
});
