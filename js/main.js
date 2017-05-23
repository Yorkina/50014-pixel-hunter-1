/** @type {Array<HTMLElement>} */
const templates = Array.from(document.querySelectorAll(`template`));

/** @type {HTMLElement} */
const mainContainer = document.querySelector(`.central`);

/** @type {HTMLElement} */
const main = mainContainer.querySelector(`.central__content`);

/** @const {string} */
const ARROW_RIGHT_KEY_CODE = `ArrowRight`;

/** @const {string} */
const ARROW_LEFT_KEY_CODE = `ArrowLeft`;

/** @type {number} */
let listCounter = -1;

const pasteTemplate = (template = main) => {
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(template);
};

const createTemplate = () => {
  if (listCounter < 0) {
    pasteTemplate();
    return;
  }

  const content = templates[listCounter].content;
  const newNode = content.cloneNode(true);
  pasteTemplate(newNode);
};

const increaseCounter = () => {
  if (listCounter >= (templates.length - 1)) {
    return;
  }

  listCounter++;
};

const decreaseCounter = () => {
  if (listCounter < 0) {
    return;
  }

  listCounter--;
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_RIGHT_KEY_CODE) {
    increaseCounter();
    createTemplate();
  }

  if (evt.altKey && evt.key === ARROW_LEFT_KEY_CODE) {
    decreaseCounter();
    createTemplate();
  }
});
