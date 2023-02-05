function swiperSlider() {
  const achievementsSliders = document.querySelectorAll(
    '[data-slider="achievements"]'
  );
  const crewSliders = document.querySelectorAll('[data-slider="crew"]');
  if (achievementsSliders) {
    achievementsSliders.forEach(slider => {
      var swiper = new Swiper('.mySwiper', {
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      });
    });
  }
  //
  if (crewSliders) {
    crewSliders.forEach(slider => {
      var swiper = new Swiper('.mySwiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      });
    });
  }
}
window.addEventListener('load', swiperSlider);
