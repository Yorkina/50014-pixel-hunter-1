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
let listCounter = 0;


const pasteTemplateToPage = () => {
  const content = templates[listCounter].content;
  const newNode = content.cloneNode(true);
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(newNode);
};

const addTemplate = () => {
  const extraTemplate = document.createElement(`template`);
  extraTemplate.content.appendChild(main);
  templates.unshift(extraTemplate);
};
addTemplate();
pasteTemplateToPage();

const increaseCounter = () => {
  if (listCounter >= (templates.length - 1)) {
    return;
  }

  listCounter++;
};

const decreaseCounter = () => {
  if (listCounter === 0) {
    return;
  }

  listCounter--;
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_RIGHT_KEY_CODE) {
    increaseCounter();
    pasteTemplateToPage();
  }

  if (evt.altKey && evt.key === ARROW_LEFT_KEY_CODE) {
    decreaseCounter();
    pasteTemplateToPage();
  }
});
