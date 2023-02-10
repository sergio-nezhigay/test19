(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    body: document.querySelector('body'),
    modal: document.querySelector('[data-modal]'),
  };
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.body.addEventListener('click', onBodyClick);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('modal-open');
  }

  function onBodyClick(e) {
    if (e.target.classList.contains('backdrop')) toggleModal();
  }
})();
