import { OLAPIC_API_KEY, OLAPIC_URL } from './config.js';

function returnImageTags(arr) {
  const media = arr.data._embedded.media;
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
  document.getElementById('js-olapic_stream').innerHTML = tags + document.getElementById('js-olapic_stream').innerHTML;
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

getImageUrls();

// mount Glide.js
new Glide('.glide').mount();


// odometer counter
setTimeout(function(){

    window.odometer.innerHTML = 611500;
}, 1000);