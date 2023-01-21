'use strict'

const searchFoo = () => {
  const inputSearchButton = document.querySelector('.input_search_button');
  const formInput = document.querySelector('.form_input');
  const clearSearchButton = document.querySelector('.clear_search_button');
  const inputSearch = document.querySelector('.input_search');
  const headerImgLogo = document.querySelector('.header_img_logo');
  const headerUserAvatar = document.querySelector('.header_user_avatar');
  const closeInput = document.querySelector('.close_input');

  inputSearchButton.addEventListener('click', event => {
    event.preventDefault();
    if (document.documentElement.offsetWidth <= 650) {
      formInput.style.flex = '1';
      inputSearch.style.display = 'block';
      inputSearch.style.border = 'none';
      headerImgLogo.style.display = 'none';
      headerUserAvatar.style.display = 'none';
      closeInput.style.display = 'block';
    };
  });

  inputSearch.addEventListener('keydown', () => {
    if (inputSearch.value.length > 0) {
      clearSearchButton.classList.add('is-open');
    } else {
      clearSearchButton.classList.remove('is-open');
    }
  });

  clearSearchButton.addEventListener('click', event => {
    event.preventDefault();
    formInput.reset();
    clearSearchButton.classList.remove('is-open');
  });

  closeInput.addEventListener('click', event => {
    event.preventDefault();

    formInput.style.flex = '';
    inputSearch.style.display = '';
    inputSearch.style.border = '';
    headerImgLogo.style.display = '';
    headerUserAvatar.style.display = '';
    closeInput.style.display = '';
  });
};


const createList = (wrapper, cardList) => {
  wrapper.textContent = '';

  cardList.forEach(({snippet: {publishedAt, title, channelTitle, thumbnails: {high: {url}}}}, index) => {
    let cards = `
      <div class="card_video swiper-slide">
                    <div class="contant_img_video">
                        <img class="img_video" src=${url} alt="">
                        <span class="text_time_video">4:15</span>
                    </div>
                    <div class="about_video">
                        <h3 class="title_video">${title}</h3>
                        <div class="video_time_about">
                            <div class="view_yime">
                            <span class="video_time_about_text view">${cardList[index].statistics ? cardList[index].statistics.viewCount + ' view' : '80k view'}</span>
                            <span class="video_time_about_text release_date">${publishedAt}</span>
                            </div>
                            <span class="video_time_about_text author_video">${channelTitle}</span>
                        </div>
                    </div>
      </div>
    `

    wrapper.insertAdjacentHTML('beforeend', cards);
  });
};

 const createListGlo = () => {
  const containerUserVideoRecomen = document.querySelector('.container_user_video_recomen');
  const listVideo = gloAcademy;

  createList(containerUserVideoRecomen, listVideo);
} 

const createListTrending = () => {
  const recomenVideoAllUser = document.querySelector('.recomen_video_all_user');
  const listTrending = trending;

  createList(recomenVideoAllUser, listTrending);
};

 const createListMusic = () => {
  const containerUserVideoMusic = document.querySelector('.container_user_video_music');
  const listMusic = music;

  createList(containerUserVideoMusic, listMusic);
}; 

createListGlo(); 
createListTrending();
createListMusic(); 
searchFoo(); 