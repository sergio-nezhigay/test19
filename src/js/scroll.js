const arrowEl = document.querySelector('.hero__circle');
console.log('start');

arrowEl.addEventListener('click', () => {
  console.log('clocked');
  document.querySelector('.advantages').scrollIntoView({
    behavior: 'smooth',
  });
});
