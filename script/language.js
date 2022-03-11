
import i18Obj from './translate.js';

const langButtonWrapper = document.querySelector('.lang__button-wrapper');
const langButtons = document.querySelectorAll('.lang__button');

const changeClassActiveLanguageBtn = (e) => {
  langButtons.forEach(btn => btn.classList.remove('lang__button-active'));
  if (e.target.classList.contains('lang__button')){
    e.target.classList.add('lang__button-active');
  }
};

let language = 'en';

langButtonWrapper.addEventListener('click', e => {
  if(e.target.classList.contains('lang__button'))
  changeClassActiveLanguageBtn(e);
  if (e.target.dataset.lang === 'en') {
    language = 'en';
    changeLanguage(language);
    
  }
  if (e.target.dataset.lang === 'ru') {
    language = 'ru';
    changeLanguage(language);
  }
});

const changeLanguage = (language) => {
  const elements = document.querySelectorAll('[data-i18]');
  
  elements.forEach((elem) => {
  
    const getCompareData = 
      Object.keys(i18Obj[language])
      .find(item => item === elem.dataset.i18);
    
    if (getCompareData) {
      elem.textContent = i18Obj[language][elem.dataset.i18]
    }
    if (elem.placeholder) {
      elem.placeholder =''
      elem.placeholder = i18Obj[language][elem.dataset.i18]
    }
  })
};

const langBtnEn = document.querySelector('.lang-btn-en');
const langBtnRu = document.querySelector('.lang-btn-ru');

const loadClassActiveLanguageBtn = (language) => {
  if (language === 'en') {
    langBtnEn.classList.add('lang__button-active');
    langBtnRu.classList.remove('lang__button-active');
  } else {
    langBtnRu.classList.add('lang__button-active');
    langBtnEn.classList.remove('lang__button-active')
  }
};

/**Local Storage */
const setLocalStorageLang = () => {
  localStorage.setItem('language', language);
};

const getLocalStorageLang = () => {
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    changeLanguage(language);
    loadClassActiveLanguageBtn(language);
  }
};

window.addEventListener('beforeunload', setLocalStorageLang);
window.addEventListener('load', getLocalStorageLang);