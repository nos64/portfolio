
/**Смена темы светлая-темная */
const themeBtn = document.querySelector('.header__theme');
const themeLink = document.querySelector('#theme-link');

themeBtn.addEventListener('click', () => {
  if (themeLink.getAttribute("href") === "style/style.css") {
    theme = "style/light-theme.css";
    themeLink.href = "style/light-theme.css";
  } else {
    theme = "style/style.css";
    themeLink.href = "style/style.css"
  }
});

const loadTheme = (theme) => {
  themeLink.href = theme;
}

/**Local Storage */
let theme = "style/style.css";

const setLocalStorageTheme = () => {
  localStorage.setItem('theme', theme);
};

const getLocalStorageTheme = () => {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    loadTheme(theme);
  }
};

window.addEventListener('beforeunload', setLocalStorageTheme);
window.addEventListener('load', getLocalStorageTheme);
