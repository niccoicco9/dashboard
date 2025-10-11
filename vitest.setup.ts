import "@testing-library/jest-dom/vitest";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(document.documentElement, 'clientHeight', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(document.documentElement, 'scrollHeight', {
  writable: true,
  configurable: true,
  value: 2048,
});

Element.prototype.getBoundingClientRect = function() {
  return {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {}
  };
};