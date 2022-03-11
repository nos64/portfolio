const videoBtn = document.querySelector('.video__btn');
const videoPlayer = document.querySelector('.video__player');
const playPause = document.querySelector('.play-pause')
const volumeMute = document.querySelector('.volume-mute');
const videoViewer = document.querySelector('.video__viewer');
const videoControls = document.querySelector('.video__controls');
const videoTimeElapsed = document.querySelector('.video__time-elapsed');
const videoDuration = document.querySelector('.video__duration');
const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');

const showElem = (elem, param) => {
  let opacity = 0;
  elem.opacity = opacity;
  elem.style.display = '';

  const animation = () => {
    opacity += param;
    elem.style.opacity = opacity;
    if (opacity < 1) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation)
};

const hideElem = (elem, param) => {
  let opacity = getComputedStyle(elem).getPropertyValue('opacity');
  const animation = () => {
    opacity -= param;
    elem.style.opacity = opacity;
    if (opacity > 0) {
      requestAnimationFrame(animation)
    } else {
      elem.style.display = 'none';
    }
  }
  requestAnimationFrame(animation)
  };

/**Функция запуска видео */
const playpauseVideo = () => {
  if (!videoPlayer.classList.contains('video__player-transparent')) {
    hideElem(videoPlayer, 0.01)
    videoPlayer.classList.add('video__player-transparent');
  }
  if (!videoControls.classList.contains('video__controls-transparent')) {
    showElem(videoControls, 0.03)
    videoControls.classList.add('video__controls-transparent');
  }
  playPause.classList.toggle('pause');
  if (videoViewer.paused || videoViewer.ended) {
    videoViewer.play()
    videoBtn.classList.add('video__btn-active');
  } else {
    videoViewer.pause()
    videoBtn.classList.remove('video__btn-active');
  }
};

/**Функция преобразования продолжительности времени в нужный формат */
const videoTime = (timeInSeconds) => {
  const result = new Date(timeInSeconds * 1000).toISOString();

  return {
    min: result.substring(14, 16),
    sec: result.substring(17, 19),
  };
};

/**Отображение продолжительности видео */
const initVideo = (e) => {
  const duration = Math.round(videoViewer.duration);
  const time = videoTime(duration);
  videoDuration.textContent = `${time.min}:${time.sec}`;
  videoDuration.setAttribute('datetime', `${time.min}m:${time.sec}s`);
  progress.setAttribute('max', duration);
};

/**Отображение времени воспроизведения */
const udateTimeVideo = () => {
  const time = videoTime(Math.round(videoViewer.currentTime));
  videoTimeElapsed.textContent = `${time.min}:${time.sec}`;
  videoTimeElapsed.setAttribute('datetime', `${time.min}m:${time.sec}s`);
};

/**Изменение прогрессбара при воспроизведении */
const updateProgressBar = () => {
  progress.value = Math.round(videoViewer.currentTime);
  let time = Math.floor((Math.round(videoViewer.currentTime) * 100) / Math.round(videoViewer.duration));
  progress.style.background = `linear-gradient(to right,var(--color-gold) ${time}%,var(--color-gold) ${time}%,#c8c8c8 0%,#c8c8c8 100%)`;
}

/**Получение места клика по прогрессбару*/
const updateSeek = (e) => {
  const skipTo = Math.round((e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10));
  progress.setAttribute('data-seek', skipTo);
}

/**Переключение времени воспроизведения при щелчке п прогрессбару */
const skipAhead = (e) => {
  const skipTo = e.target.dataset.seek 
    ? e.target.dataset.seek 
    : e.target.value;
  videoViewer.currentTime = skipTo;
  progress.value = skipTo;
}

const updateVolume = () => {
  if (videoViewer.muted) {
    videoViewer.muted = false;
  }
  videoViewer.volume = volume.value;
  let volumeRange = videoViewer.volume * 100;
  volume.style.background = `linear-gradient(to right,var(--color-gold) ${volumeRange}%,var(--color-gold) ${volumeRange}%,#c8c8c8 0%,#c8c8c8 100%)`;
} 

const handlerVolumeIcon = () => {
  if (videoViewer.muted || videoViewer.volume === 0) {
    volumeMute.classList.add('mute');
  } else {
    volumeMute.classList.remove('mute');
  }
}

/**Нажате на кнопку Volume / mute */
volumeMute.addEventListener('click', () => {
  videoViewer.muted = !videoViewer.muted;
  if (videoViewer.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
    volume.style.background = `linear-gradient(to right,var(--color-gold) 0%,var(--color-gold) 0%,#c8c8c8 0%,#c8c8c8 100%)`;
  } else {
    volume.value = volume.dataset.volume;
    let volumeRange = volume.dataset.volume *100
    volume.style.background = `linear-gradient(to right,var(--color-gold) ${volumeRange}%,var(--color-gold) ${volumeRange}%,#c8c8c8 0%,#c8c8c8 100%)`;
  }
})


videoPlayer.addEventListener('click', playpauseVideo);
videoBtn.addEventListener('click', playpauseVideo);
playPause.addEventListener('click', playpauseVideo);
videoViewer.addEventListener('click', playpauseVideo);
videoViewer.addEventListener('loadedmetadata', initVideo);
videoViewer.addEventListener('timeupdate', udateTimeVideo);
videoViewer.addEventListener('timeupdate', updateProgressBar);
progress.addEventListener('mousemove', updateSeek);
progress.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
videoViewer.addEventListener('volumechange', handlerVolumeIcon);

