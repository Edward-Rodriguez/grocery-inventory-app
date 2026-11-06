const form = document.querySelector('#search-form');

form.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const searchString = e.target.value.trim().toLowerCase();
    if (searchString) form.submit();
  }
});
