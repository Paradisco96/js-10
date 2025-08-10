import { DEFAULT_SETTINGS, ELEMENT_IDS, CSS_CLASSES, KEYBOARD_CODES } from './helpers/config.js';

class Carousel {
  //Private state variables
  #currentSlide;
  #timerId;

  //Private DOM element
  #pauseBtn;
  #nextBtn;
  #prevBtn;
  #indicatorsContainer;
  #indicatorsItems;

  //Private constance
  #SLIDES_COUNT;
  #CODE_RIGHT_RIGHT;
  #CODE_LEFT_LEFT;
  #CODE_SPACE;
  #FA_PAUSE;
  #FA_PLAY;
  #FA_PREV;
  #FA_NEXT;

  constructor(options) {
    const settings = { ...DEFAULT_SETTINGS, ...options };

    this.container = document.querySelector(settings.containerId);
    this.slides = this.container.querySelectorAll(settings.slideId);
    this.TIMER_INTERVAL = options.interval;
    this.isPlaying = settings.isPlaying;
  }

  #initProps() {
    this.#currentSlide = 0;

    this.#SLIDES_COUNT = this.slides.length;
    this.#CODE_RIGHT_RIGHT = KEYBOARD_CODES.RIGHT_ARROW;
    this.#CODE_LEFT_LEFT = KEYBOARD_CODES.LEFT_ARROW;
    this.#CODE_SPACE = KEYBOARD_CODES.SPACE;
    this.#FA_PAUSE = '<i class="fas fa-pause"></i>';
    this.#FA_PLAY = '<i class="fas fa-play"></i>';
    this.#FA_PREV = '<i class="fas fa-chevron-left"></i>';
    this.#FA_NEXT = '<i class="fas fa-chevron-right"></i>';
  }

  #initControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add(CSS_CLASSES.CONTROLS);
    controlsContainer.setAttribute('id', ELEMENT_IDS.CONTROLS_CONTAINER);

    const PAUSE_BTN = `<div class="${CSS_CLASSES.PAUSE_BTN}" id="${ELEMENT_IDS.PAUSE_BTN}">
        ${this.#FA_PAUSE}
        </div>`;

    const PREV_BTN = `<div class="${CSS_CLASSES.PREV_BTN}" id="${ELEMENT_IDS.PREV_BTN}">
        ${this.#FA_PREV}
        </div>`;

    const NEXT_BTN = `<div class="${CSS_CLASSES.NEXT_BTN}" id="${ELEMENT_IDS.NEXT_BTN}">
        ${this.#FA_NEXT}
        </div>`;

    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN;

    this.container.append(controlsContainer);

    this.#pauseBtn = this.container.querySelector(`#${ELEMENT_IDS.PAUSE_BTN}`);
    this.#nextBtn = this.container.querySelector(`#${ELEMENT_IDS.NEXT_BTN}`);
    this.#prevBtn = this.container.querySelector(`#${ELEMENT_IDS.PREV_BTN}`);
  }

  #initIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add(CSS_CLASSES.INDICATORS);
    indicatorsContainer.setAttribute('id', ELEMENT_IDS.INDICATORS_CONTAINER);

    this.container.append(indicatorsContainer);

    for (let i = 0; i < this.#SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i ? CSS_CLASSES.INDICATOR : `${CSS_CLASSES.INDICATOR} ${CSS_CLASSES.ACTIVE}`);
      indicator.dataset.slideTo = `${i}`;
      indicatorsContainer.append(indicator);
    }
    this.#indicatorsContainer = this.container.querySelector(`#${ELEMENT_IDS.INDICATORS_CONTAINER}`);
    this.#indicatorsItems = this.container.querySelectorAll(`.${CSS_CLASSES.INDICATOR}`);
  }

  #initEventListeners() {
    this.#pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.#nextBtn.addEventListener('click', this.next.bind(this));
    this.#prevBtn.addEventListener('click', this.prev.bind(this));
    this.#indicatorsContainer.addEventListener('click', this.#indicatorClick.bind(this));
    document.addEventListener('keydown', this.#keydown.bind(this));
  }

  #gotoNth(n) {
    this.slides[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE);
    this.#indicatorsItems[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE);
    this.#currentSlide = (n + this.#SLIDES_COUNT) % this.#SLIDES_COUNT;
    this.slides[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE);
    this.#indicatorsItems[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE);
  }

  #gotoNext() {
    this.#gotoNth(this.#currentSlide + 1);
  }

  #gotoPrev() {
    this.#gotoNth(this.#currentSlide - 1);
  }

  #tick() {
    this.#timerId = setInterval(this.#gotoNext.bind(this), this.TIMER_INTERVAL);
  }

  #indicatorClick(e) {
    const { target } = e;

    if (target && target.classList.contains(CSS_CLASSES.INDICATOR)) {
      const slideTo = +target.dataset.slideTo;
      this.pause();
      this.#gotoNth(slideTo);
    }
  }

  #keydown(e) {
    const { code } = e;
    if (code === this.#CODE_LEFT_LEFT) this.prev();
    if (code === this.#CODE_RIGHT_RIGHT) this.next();
    if (code === this.#CODE_SPACE) {
      e.preventDefault();
      this.pausePlay();
    }
  }

  play() {
    this.#pauseBtn.innerHTML = this.#FA_PAUSE;
    this.isPlaying = true;
    this.#tick();
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.#pauseBtn.innerHTML = this.#FA_PLAY;
    clearInterval(this.#timerId);
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  prev() {
    this.pause();
    this.#gotoPrev();
  }

  next() {
    this.pause();
    this.#gotoNext();
  }

  init() {
    this.#initProps();
    this.#initControls();
    this.#initIndicators();
    this.#initEventListeners();
    this.#tick();
  }
}

export default Carousel;
