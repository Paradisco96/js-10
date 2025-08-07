const container = document.querySelector("#carousel");
const slidesContainer = container.querySelector("#slides-container");
const slides = container.querySelectorAll(".slide");
const indicatorContainer = container.querySelector("#indicators-container");
const indicators = container.querySelectorAll(".indicator");
const pauseButton = container.querySelector("#pause-btn");
const nextButton = container.querySelector("#next-btn");
const prevButton = container.querySelector("#prev-btn");

const SLIDES_COUNT = slides.length;
const CODE_ARROW_RIGHT = "ArrowRight";
const CODE_ARROW_LEFT = "ArrowLeft";
const CODE_SPACE = "Space";
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';
const TIMER_INTERVAL = 2000;
const SWIPE_THERESHOLD = 100;

let currentSlide = 0;
let isPlaying = true;
let timerId = null;
let swipeStartX = null;
let swipeEndX = null;

function gotoNth(n) {
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}

function tick() {
  timerId = setInterval(gotoNext, TIMER_INTERVAL);
}

function playHandler() {
  pauseButton.innerHTML = FA_PAUSE;
  isPlaying = true;
  tick();
}

function pauseHandler() {
  if (!isPlaying) return;
  isPlaying = false;
  pauseButton.innerHTML = FA_PLAY;
  clearInterval(timerId);
}

function pausePlayHandler() {
  isPlaying ? pauseHandler() : playHandler();
}

function prevHandler() {
  pauseHandler();
  gotoPrev();
}

function nextHandler() {
  pauseHandler();
  gotoNext();
}

function indicatorClickHandler(e) {
  const { target } = e;

  if (target && target.classList.contains("indicator")) {
    const slideTo = +target.dataset.slideTo;
    pauseHandler();
    gotoNth(slideTo);
  }
}

function keydownHandler(e) {
  const { code } = e;
  if (code === CODE_ARROW_LEFT) prevHandler();
  if (code === CODE_ARROW_RIGHT) nextHandler();
  if (code === CODE_SPACE) {
    e.preventDefault();
    pausePlayHandler();
  }
}

function swipeStartHandler(e) {
  swipeStartX =
    e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
}

function swipeEndHandler(e) {
  swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;

  const diffX = swipeEndX - swipeStartX;
  if (diffX > SWIPE_THERESHOLD) prevHandler();
  if (diffX < -SWIPE_THERESHOLD) nextHandler();
}

function initEventListeners() {
  pauseButton.addEventListener("click", pausePlayHandler);
  nextButton.addEventListener("click", nextHandler);
  prevButton.addEventListener("click", prevHandler);
  indicatorContainer.addEventListener("click", indicatorClickHandler);
  slidesContainer.addEventListener("touchstart", swipeStartHandler);
  slidesContainer.addEventListener("touchend", swipeEndHandler);
  slidesContainer.addEventListener("mousedown", swipeStartHandler);
  slidesContainer.addEventListener("mouseup", swipeEndHandler);
  document.addEventListener("keydown", keydownHandler);
}

function init() {
  initEventListeners();
  tick();
}

init();
