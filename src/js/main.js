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
function cookieNotification() {
	if (!localStorage.getItem('.cookie-consent')) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					document.body.innerHTML += '\
					<div class="cookie-consent" style="position:fixed;padding:20px;left:0;right:0;bottom:0;background-color:#000;color:#fff;z-index:99999;">\
 			        <p>This website uses cookies - detailed information on the use of cookies on this website and on your rights as a data subject are provided in our <a href="#" target="_blank" style="color:#fff;">Privacy Policy</a></p> \
		            <a href="#" class="cookie-agree" style="text-align:center;margin-bottom: 15px;background-color:#C7777A;display:block;margin:0 auto;max-width:400px;padding:15px;border:none;color:#fff;text-decoration:none;font-size:18px;">Agree</a>\
                    </div>\
					';
					document.querySelector('.cookie-consent .cookie-agree').onclick = function(e) {
						e.preventDefault();
						document.querySelector('.cookie-consent').style.display = 'none';
						localStorage.setItem('.cookie-consent', true);
					};
				}
		    };
		request.open('GET', 'http://ip-api.com/json', true);
		request.send();
	}
};

cookieNotification();

// mount Glide.js slider
// eslint-disable-next-line
new Glide('.glide').mount();
