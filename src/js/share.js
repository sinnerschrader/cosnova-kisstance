// Share content

const shareButton = document.getElementById('share-button');

shareButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (navigator.share) {
    navigator.share({
      url: window.location.href
    });
  }
});
