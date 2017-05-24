const ARROW_RIGHT_KEY_CODE = `ArrowRight`;

const ARROW_LEFT_KEY_CODE = `ArrowLeft`;

const MIN_SCREEN_PAGE_NUMBER = 0;

let currentActiveScreen = 0;

const templates = [
  document.querySelector(`#greeting`),
  document.querySelector(`#rules`),
  document.querySelector(`#game-1`),
  document.querySelector(`#game-2`),
  document.querySelector(`#game-3`),
  document.querySelector(`#stats`)
].map((template) => template.content);

const addFragment = () => {
  const mainContainer = document.querySelector(`.central`);
  const fragment = document.createDocumentFragment();
  const newMain = mainContainer.cloneNode(true);
  fragment.appendChild(newMain);
  return fragment;
};

templates.unshift(addFragment());

const pasteScreen = (content) => {
  const mainContainer = document.querySelector(`.central`);
  const newNode = content.cloneNode(true);
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(newNode);
};

const decrease = (currentNumber, max) => {
  return Math.max(--currentNumber, max);
};

const increase = (currentNumber, min) => {
  return Math.min(++currentNumber, min);
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_LEFT_KEY_CODE) {
    const currentScreen = currentActiveScreen;
    currentActiveScreen = decrease(currentScreen, MIN_SCREEN_PAGE_NUMBER);
    pasteScreen(templates[currentActiveScreen]);
  }
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_RIGHT_KEY_CODE) {
    const currentScreen = currentActiveScreen;
    currentActiveScreen = increase(currentScreen, templates.length - 1);
    pasteScreen(templates[currentActiveScreen]);
  }
});
