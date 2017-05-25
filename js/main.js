const centralContainer = document.querySelector(`.central`);
const ARROW_RIGHT_KEY_CODE = `ArrowRight`;
const ARROW_LEFT_KEY_CODE = `ArrowLeft`;
const MIN_SCREEN_PAGE_NUMBER = 0;

let activeScreen = 0;

const screens = [document.querySelector(`.central`)]
  .map((element) => {
    const fragment = document.createDocumentFragment();
    const cloneElement = element.cloneNode(true);
    fragment.appendChild(cloneElement.querySelector(`.central__content`));
    fragment.appendChild(cloneElement.querySelector(`.footer`));
    return fragment;
  })
  .concat([
    document.querySelector(`#greeting`),
    document.querySelector(`#rules`),
    document.querySelector(`#game-1`),
    document.querySelector(`#game-2`),
    document.querySelector(`#game-3`),
    document.querySelector(`#stats`)
  ].map((screen) => screen.content));

const pasteScreen = (content, element) => {
  const newNode = content.cloneNode(true);
  element.innerHTML = ``;
  element.appendChild(newNode);
};

const decrease = (number, min) => {
  return Math.max(--number, min);
};

const increase = (number, max) => {
  return Math.min(++number, max);
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_LEFT_KEY_CODE) {
    activeScreen = decrease(activeScreen, MIN_SCREEN_PAGE_NUMBER);
    pasteScreen(screens[activeScreen], centralContainer);
  }
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_RIGHT_KEY_CODE) {
    activeScreen = increase(activeScreen, screens.length - 1);
    pasteScreen(screens[activeScreen], centralContainer);
  }
});
