import { OLAPIC_API_KEY, OLAPIC_URL, SHEET_URL } from './config.js';

function returnImageTags(arr) {
  const media = arr.data._embedded.media;
  const stream = document.getElementById('js-olapic_stream');
  let tags = '';
  for (let i = 0; i < 4; i++) {
    tags = tags + (
      '<img class="olapic_img" alt="kisstance instagram post number '
        + (i+1)
        + '" src="'
        + media[i].images.mobile
        + '"> <br />'
    );
  }
  stream.innerHTML = tags + document.getElementById('js-olapic_stream').innerHTML;
}

function initOdometer(res) {
  let sum;
  if (res !== isNaN) {
    sum = res;
  } else {
    sum = 500000;
  }
  // eslint-disable-next-line
  odometer.innerHTML = sum;
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

function getData() {
  const httpRequest = new XMLHttpRequest();
  const url = SHEET_URL;

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      initOdometer(this.response);
    }
  };
  httpRequest.open('GET', url, true);
  httpRequest.send();
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

// get donation sum from google spreadsheet (as CVS)
getData();

// get image URLs from OlaPic
getImageUrls();

//Cookie Notification
var cookieNotificationElement = document.getElementById('cookie-notification');
var acceptCookies = document.querySelector('.accept-cookie');

acceptCookies.addEventListener("click", function(){
  localStorage.setItem("cookieNotification", "accepted");
  cookieNotificationElement.classList.add('hide');
});

if(localStorage.getItem("cookieNotification") === null){
  cookieNotificationElement.classList.remove('hide');
} else {
  cookieNotificationElement.classList.add('hide');
}

// mount Glide.js slider
// eslint-disable-next-line
new Glide('.glide').mount();

//Cookie Notification
var cookieNotificationElement = document.getElementById('cookie-notification');
var acceptCookies = document.querySelector('.accept-cookie');

acceptCookies.addEventListener("click", function(){
  localStorage.setItem("cookieNotification", "accepted");
  cookieNotificationElement.classList.add('hide');
});

if(localStorage.getItem("cookieNotification") === null){
  cookieNotificationElement.classList.remove('hide');
} else {
  cookieNotificationElement.classList.add('hide');
}
