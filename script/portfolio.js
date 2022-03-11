/** Смена изображений Портфолио*/
const portfotioBtns = document.querySelectorAll('.portfolio__btn');
const portfolioImages = document.querySelectorAll('.portfolio__image');
const portfotioBtnWrapper = document.querySelector('.portfotio__button-wrapper');

const changeClassActive =(e) => {
  portfotioBtns.forEach(btn => btn.classList.remove('portfolio__btn-active'))
  if (e.target.classList.contains('portfolio__btn')){
    e.target.classList.add('portfolio__btn-active')
  }
};

portfotioBtnWrapper.addEventListener('click', e => {
  changeClassActive(e)
  if (e.target.dataset.i18 === 'winter') {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`);
  } else if (e.target.dataset.i18 === 'spring') {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`);
  } else if (e.target.dataset.i18 === 'summer') {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`);
  } else if (e.target.dataset.i18 === 'autumn'){
    portfolioImages.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`);
  }
})

const preloadImages = () => {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  seasons.forEach(season => {
    for (let i = 1; i <= 6; i++){
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  })
};


preloadImages();