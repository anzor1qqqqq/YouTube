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
  
}; 

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


//API youtube

const API_YOUTUBE = () => {
let signInProfile = document.querySelector('.button_signIn');
let signOutProfile = document.querySelector('.img_header_exit');

let auth = (data) => {
    signInProfile.classList.add('hide');
    signOutProfile.classList.remove('hide');
    signOutProfile.src = data.getImageUrl(); 
    signOutProfile.alt = data.getName();
    getChanel();
};

let noAuth = () => {
    signInProfile.classList.remove('hide');
    signOutProfile.classList.add('hide');
    signOutProfile.src = '';
    signOutProfile.alt = '';
};

let handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn();
};

let handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
};

let updateStatusAuth = (data) => {
    data.isSignedIn.listen(() => {
        updateStatusAuth(data);
    });

    if (data.isSignedIn.get()) {
        let userData = data.currentUser.get().getBasicProfile();
        auth(userData);    
    } else {
        noAuth();
    }
};
 
function initClient() {
    gapi.client.init({
        //      'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
        updateStatusAuth(gapi.auth2.getAuthInstance());
        signInProfile.addEventListener('click', handleAuth);
        signOutProfile.addEventListener('click', handleSignOut);
    });//.catch(() => {
        //signInProfile.removeEventListener('click', handleAuth);
        //signOutProfile.removeEventListener('click', handleSignOut);
       // alert('Авторизация невозможна');
    //});
};

  gapi.load('client:auth2', initClient);

  let menuNav = () => {
    let navMenuMore = document.querySelector('.nav-menu-more');
    let showMore = document.querySelector('.show-more');

    showMore.addEventListener('click', (event) => {
        event.preventDefault();
        navMenuMore.classList.toggle('nav-menu-more-show');
    });
  };

  let loadVideos = () => {
    searchRequest('UCVswRUcKC-M35RzgPRv8qUg', (data) => {
        createList(gloAcademyList, data);
    });
  };

  let formSearch = document.querySelector('.form_search');

    formSearch.addEventListener('submit', (event) => {
        event.preventDefault();
        let value = formSearch.elements.search.value;
        searchRequest(value, data => {
            createList(gloAcademyList, data);
        });
  });

  let searchRequest = (searchText, callback, maxResult = 12) => {
        gapi.client.youtube.search.list({
            part: 'snippet',
            q: searchText,
            maxResult,
            order: 'relevance',
        }).execute(response => {
            callback(response.item);
        });
    };

menuNav();
};

API_YOUTUBE();