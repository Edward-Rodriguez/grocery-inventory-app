const image = document.querySelector('#image-preview');
const applyImageBtn = document.querySelector('#apply-img-btn');
const imgLoadError = document.querySelector('#img-load-error');
const previousImageUrl = image.src;
let imgLoadedSuccessfully = true;
function previewImage() {
  applyImageBtn.disabled = true;
  const newImageUrl = document.querySelector('#imageUrl').value.trim();
  imgLoadError.textContent = 'Loading...';
  image.src = newImageUrl;
  imgLoadedSuccessfully = true;
}

applyImageBtn.addEventListener('click', previewImage);
image.addEventListener('error', () => {
  imgLoadedSuccessfully = false;
  imgLoadError.textContent =
    'Unable to load image. Please check the URL and try again.';
  image.src = previousImageUrl;
});
image.addEventListener('load', () => {
  applyImageBtn.disabled = false;
  imgLoadedSuccessfully && (imgLoadError.textContent = '');
});
