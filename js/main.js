let API_KEY = 'AIzaSyAwu1BwlcmXqYXFs0zAiCNgK1Q0fVftgxw';
let CLIENT_ID = '327068352668-urafapcd93hg9pqkh9sste4t0obiadmv.apps.googleusercontent.com';



let gloAcademyList = document.querySelector('.glo-academy-list');
let trendingList = document.querySelector('.trending-list');
let musicList = document.querySelector('.music-list');

let createCard = (dataVideo) => {

    let imgVideo = dataVideo.snippet.thumbnails.high.url;
    let videoLink = typeof dataVideo.id === "string" ? dataVideo.id : dataVideo.id.videoId;
    let titleVideo = dataVideo.snippet.title; 
    let publishVideo = dataVideo.snippet.publishedAt;
    let channelVideo = dataVideo.snippet.channelTitle;
    let videoView = dataVideo.statistics?.viewCount;

    let card = document.createElement('div');
    card.classList.add('video-card');
    card.innerHTML = `
            <div class="video-thumb">
            <a class="link-video youtube-modal" href="https://youtu.be/${videoLink}">
            <img src="${imgVideo}" alt="" class="thumbnail">
        </a>
        </div>
            <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
            <span class="video-counter">
            ${videoView ? `<span class="video-views">${videoView} просмотров</span>` : ''}
            <span class="video-date">${(new Date(publishVideo)).toLocaleString('ru-RU')}</span>
        </span>
            <span class="video-channel">${channelVideo}</span>
        </div>
    `;
    return card;
};

let createList = (wrapper, listVideo) => {
    wrapper.textContent = '';

    listVideo.forEach(item => {
        let card = createCard(item);
        wrapper.append(card);
    });
};

createList(gloAcademyList, gloAcademy);
createList(trendingList, trending);
createList(musicList, music);




let signInProfile = document.querySelector('.auth-btn');
let signOutProfile = document.querySelector('.user-avatar');

let auth = (data) => {
    signInProfile.classList.add('hide');
    signOutProfile.classList.remove('hide');
    signOutProfile.src = data.getImageUrl(); 
    signOutProfile.alt = data.getName();
    getChanel();
}

let noAuth = () => {
    signInProfile.classList.remove('hide');
    signOutProfile.classList.add('hide');
    signOutProfile.src = '';
    signOutProfile.alt = '';
}

let handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn();
}

let handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
}

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
}
 
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
}

gapi.load('client:auth2', initClient);


let menuNav = () => {
    let navMenuMore = document.querySelector('.nav-menu-more');
    let showMore = document.querySelector('.show-more');

    showMore.addEventListener('click', (event) => {
        event.preventDefault();
        navMenuMore.classList.toggle('nav-menu-more-show');
    });
}



let loadVideos = () => {
    searchRequest('UCVswRUcKC-M35RzgPRv8qUg', (data) => {
        createList(gloAcademyList, data);
    });
}

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
    }



menuNav();