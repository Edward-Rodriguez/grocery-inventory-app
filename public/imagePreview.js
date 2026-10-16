const image = document.querySelector('#image-preview');
const applyImageBtn = document.querySelector('#apply-img-btn');
const imgLoadError = document.querySelector('#img-load-error');
const previousImageUrl = image.src;
function previewImage() {
  applyImageBtn.disabled = true;
  const newImageUrl = document.querySelector('#image-url').value.trim();
  imgLoadError.textContent = '';
  image.src = newImageUrl;
}

applyImageBtn.addEventListener('click', previewImage);
image.addEventListener('error', () => {
  imgLoadError.textContent =
    'Unable to load image. Please check the URL and try again.';
  image.src = previousImageUrl;
});
image.addEventListener('load', () => {
  applyImageBtn.disabled = false;
});
