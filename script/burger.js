/**Бургер меню */
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation__list');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger_active');
  navigation.classList.toggle('navigation__list-active');
});

const closeMenu = () => {
  burger.classList.remove('burger_active');
  navigation.classList.remove('navigation__list-active');
}

navigation.addEventListener('click', e => {
  if (e.target.classList.contains('navigation__link')) {
    closeMenu()
  }
})