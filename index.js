const slides = document.querySelectorAll('.slide');
const pause = document.getElementById('pause');

let currentSlide = 0;
let isPlaying = true;

function nextSlide() {
  slides[currentSlide].classList.toggle('active');
currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.toggle('active');
}

let slideInterval = setInterval(nextSlide, 2000);

function playSlideshow() {
  slideInterval = setInterval(nextSlide, 2000);
  isPlaying = true;
  pause.innerHTML = 'Pause';
}

function pauseSlideshow() {
isPlaying = false;
pause.innerHTML = 'Play';
clearInterval(slideInterval);
}

function playPauseSlideshow() {
  if (isPlaying) {
    pauseSlideshow()
  } else {
    playSlideshow()
  }
  }


pause.addEventListener('click', playPauseSlideshow);