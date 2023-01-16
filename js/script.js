'use strict'
new Swiper('.video_recomen_all_user', {
    loop: true,
    slidesPerView: 3, 
    spaceBetween: 43,  


    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
});  

new Swiper('.user_recomen_video', {
    loop: true,
    slidesPerView: 6,
    spaceBetween: 20,


    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
});

