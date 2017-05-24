const mainContainer = document.querySelector(`.central`);

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
  const fragment = document.createDocumentFragment();
  const newMain = mainContainer.cloneNode(true);
  fragment.appendChild(newMain);
  return fragment;
};

templates.unshift(addFragment());

const pasteScreen = () => {
  const content = templates[currentActiveScreen];
  const newNode = content.cloneNode(true);
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(newNode);
};

const increase = (max, current) => {
  return Math.min(max, current);
};

const decrease = (min, current) => {
  return Math.max(min, current);
};

const pressRight = () => {
  const currentScreen = ++currentActiveScreen;
  currentActiveScreen = increase(templates.length - 1, currentScreen);
  pasteScreen();
};

const pressLeft = () => {
  const currentScreen = --currentActiveScreen;
  currentActiveScreen = decrease(MIN_SCREEN_PAGE_NUMBER, currentScreen);
  pasteScreen();
};

document.addEventListener(`keydown`, (evt) => {
  if (!evt.altKey) {
    return;
  }

  if (evt.key === ARROW_RIGHT_KEY_CODE) {
    pressRight();
  }

  if (evt.key === ARROW_LEFT_KEY_CODE) {
    pressLeft();
  }
});
