import { SwipeCarousel } from './carousel/index.js';

const carousel = new SwipeCarousel({
  // containerId: 'mycarousel',
  slideId: '.item',
  interval: 1000,
});

carousel.init();
