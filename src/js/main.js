import { OLAPIC_API_KEY, OLAPIC_URL } from './config.js';
const TOTAL_IMAGES = 20;

function returnImageTags(arr) {
  const media = arr.data._embedded.media;
  const stream = document.getElementById('olapic-images');
  const totalImgTags = stream.getElementsByTagName('img').length;

  if (totalImgTags < TOTAL_IMAGES) {
    let tags = '';

    // we want to load 4 pictures at a time, hence +4
    for (let i = totalImgTags; i < totalImgTags + 4; i++) {
      tags = tags + (
        '<img class="olapic_img" alt="kisstance instagram post number '
        + (i+1)
        + '" src="'
        + media[i].images.mobile
        + '"> <br />'
      );
    }
    document.getElementById('olapic-images').innerHTML =
      document.getElementById('olapic-images').innerHTML + tags;
  }
}

function initOdometer() {
  window.setTimeout(() => {
    // eslint-disable-next-line
    odometer.innerHTML = 1000000;
  }, 1500);
}

function getImages(url) {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const myArr = JSON.parse(this.responseText);
      returnImageTags(myArr);
    }
  };
  request.open('GET', url, true);
  request.send();
}

function getImageUrls() {
  const httpRequest = new XMLHttpRequest();
  const url = OLAPIC_URL + '&auth_token=' + OLAPIC_API_KEY;

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const myArr = JSON.parse(this.responseText);
      const imageUrl = 'https:' + myArr.data._embedded['media:recent']._links.self.href;
      getImages(imageUrl);
    }
  };
  httpRequest.open('GET', url, true);
  httpRequest.send();
}

document.addEventListener('click', function (event) {
  if (event.target.matches('#loadImagesBtn')) {
    const totalTags = document.getElementById('olapic-images').getElementsByTagName('img').length;
    if (totalTags < TOTAL_IMAGES) {
      getImageUrls();
    } else {
      window.location.href = 'https://www.instagram.com/explore/tags/kisstance/';
    }
  }
}, false);

// init Counter
initOdometer();

// get image URLs from OlaPic
getImageUrls();

// mount Glide.js slider
// eslint-disable-next-line
new Glide('.glide').mount();

// Cookie Notification
let cookieNotificationElement = document.getElementById('cookie-notification');
let acceptCookies = document.querySelector('.accept-cookie');

acceptCookies.addEventListener('click', function () {
  localStorage.setItem('cookieNotification', 'accepted');
  cookieNotificationElement.classList.add('hide');
});

if (localStorage.getItem('cookieNotification') === null) {
  cookieNotificationElement.classList.remove('hide');
} else {
  cookieNotificationElement.classList.add('hide');
}
