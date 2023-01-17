'use strict'

new Swiper('.video_recomen_all_user', {
    loop: true,
    slidesPerView: 1, 
    spaceBetween: 43,  

    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },

    breakpoints: {
      // when window width is >= 640px
      1100: {
        slidesPerView: 2,
       /*  spaceBetween: 20, */
      },
      1600: {
        slidesPerView: 3,
      },
    }
});  

new Swiper('.user_recomen_video', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },

    breakpoints: {
      // when window width is >= 640px
      800: {
        slidesPerView: 2,
       /*  spaceBetween: 20, */
      },

      1100: {
        slidesPerView: 3,
       /*  spaceBetween: 20, */
      },

      1300: {
        slidesPerView: 4,
       /*  spaceBetween: 20, */
      },

      1600: {
        slidesPerView: 5,
       /*  spaceBetween: 20, */
      },
      1900: {
        slidesPerView: 6,
        /* spaceBetween: 20, */
      },
    }
});

