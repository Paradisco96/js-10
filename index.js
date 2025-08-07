function Carousel() {}

Carousel.prototype = {
  _initProps() {
    this.container = document.querySelector('#carousel');
    this.slidesContainer = this.container.querySelector('#slides-container');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.container.querySelectorAll('.indicator');
    this.pauseButton = this.container.querySelector('#pause-btn');
    this.nextButton = this.container.querySelector('#next-btn');
    this.prevButton = this.container.querySelector('#prev-btn');

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause"></i>';
    this.FA_PLAY = '<i class="fas fa-play"></i>';
    this.TIMER_INTERVAL = 2000;
    this.SWIPE_THERESHOLD = 100;

    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerId = null;
    this.swipeStartX = null;
    this.swipeEndX = null;
  },

  _initEventListeners() {
    this.pauseButton.addEventListener('click', this.pausePlayHandler.bind(this));
    this.nextButton.addEventListener('click', this.nextHandler.bind(this));
    this.prevButton.addEventListener('click', this.prevHandler.bind(this));
    this.indicatorContainer.addEventListener('click', this._indicatorClickHandler.bind(this));
    document.addEventListener('keydown', this._keydownHandler.bind(this));
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },

  _tick() {
    this.timerId = setInterval(this._gotoNext.bind(this), this.TIMER_INTERVAL);
  },

  _indicatorClickHandler(e) {
    const { target } = e;

    if (target && target.classList.contains('indicator')) {
      const slideTo = +target.dataset.slideTo;
      this.pauseHandler();
      this._gotoNth(slideTo);
    }
  },

  _keydownHandler(e) {
    const { code } = e;
    if (code === this.CODE_ARROW_LEFT) this._gotoPrev();
    if (code === this.CODE_ARROW_RIGHT) this._gotoNext();
    if (code === this.CODE_SPACE) {
      e.preventDefault();
      this.pausePlayHandler();
    }
  },

  playHandler() {
    this.pauseButton.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  },

  pauseHandler() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.pauseButton.innerHTML = this.FA_PLAY;
    clearInterval(this.timerId);
  },

  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler();
  },

  prevHandler() {
    this.pauseHandler();
    this._gotoPrev();
  },

  nextHandler() {
    this.pauseHandler();
    this._gotoNext();
  },

  init() {
    this._initProps();
    this._initEventListeners();
    this._tick();
  },
};

Carousel.prototype.constructor = Carousel;

function SwipeCarousel() {
  Carousel.apply(this);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initEventListeners = function () {
  Carousel.prototype._initEventListeners.apply(this);
  this.slidesContainer.addEventListener('touchstart', this._swipeStartHandler.bind(this));
  this.slidesContainer.addEventListener('touchend', this._swipeEndHandler.bind(this));
  this.slidesContainer.addEventListener('mousedown', this._swipeStartHandler.bind(this));
  this.slidesContainer.addEventListener('mouseup', this._swipeEndHandler.bind(this));
};

SwipeCarousel.prototype._swipeStartHandler = function (e) {
  this.swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
};

SwipeCarousel.prototype._swipeEndHandler = function (e) {
  this.swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;

  const diffX = this.swipeEndX - this.swipeStartX;

  if (diffX > this.SWIPE_THERESHOLD) this._gotoPrev();
  if (diffX < -this.SWIPE_THERESHOLD) this._gotoNext();
};

const carousel = new SwipeCarousel();
carousel.init();
