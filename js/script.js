'use strict'

const swiperSlide = new Swiper('.video_recomen_all_user', {
    loop: true,
    slidesPerView: 1, 
    spaceBetween: 43,  

    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },

    breakpoints: {
      1000: {
        slidesPerView: 2,
      },
      1600: {
        slidesPerView: 3,
      },
    }
});  

const sliderRecomen = new Swiper('.user_recomen_video', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },

    breakpoints: {
      800: {
        slidesPerView: 2,
      },

      1100: {
        slidesPerView: 3,
      },

      1300: {
        slidesPerView: 4,
      },

      1600: {
        slidesPerView: 5,
      },
      1900: {
        slidesPerView: 6,
      },
    }
});

const sliderFood = new Swiper('.recomen_food', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },

  breakpoints: {
    800: {
      slidesPerView: 2,
    },

    1100: {
      slidesPerView: 3,
    },

    1300: {
      slidesPerView: 4,
    },

    1600: {
      slidesPerView: 5,
    },
    1900: {
      slidesPerView: 6,
    },
  }
});

const containerUserVideoRecomen = document.querySelector('.container_user_video_recomen');

if (document.documentElement.offsetWidth <= 650) {
  sliderRecomen.destroy();
  swiperSlide.destroy();
  sliderFood.destroy();
} else {
  sliderRecomen.enable();
  swiperSlide.enable();
  sliderFood.enable();
}