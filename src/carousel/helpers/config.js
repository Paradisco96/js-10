export const DEFAULT_SETTINGS = {
  containerId: '#carousel',
  slideId: '.slide',
  interval: 4000,
  isPlaying: true,
  //swipeThreshold: 100
  //keyboardControl: true
  //infinite: true
  //autoPlay: true
};

export const CSS_CLASSES = {
  ACTIVE: 'active',
  CONTROLS: 'controls',
  INDICATORS: 'indicators',
  INDICATOR: 'indicator',
  PAUSE_BTN: 'control control-pause',
  PREV_BTN: 'control control-prev',
  NEXT_BTN: 'control control-next',
};

export const ELEMENT_IDS = {
  PAUSE_BTN: 'pause-btn',
  PREV_BTN: 'prev-btn',
  NEXT_BTN: 'next-btn',
  INDICATORS_CONTAINER: 'indicators-container',
};

export const KEYBOARD_CODES = {
  SPACE: 'Space',
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
};

export default {
  CSS_CLASSES,
  ELEMENT_IDS,
  KEYBOARD_CODES,
  DEFAULT_SETTINGS,
};
