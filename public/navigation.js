const menuBtn = document.querySelector('.menu-btn');
const dropDownMenu = document.querySelector('.dropdown-menu');

menuBtn.addEventListener('click', () => {
  dropDownMenu.classList.toggle('show');
});
