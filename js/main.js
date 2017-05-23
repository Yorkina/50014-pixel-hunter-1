/** @type {Array<HTMLElement>} */
const templates = Array.from(document.querySelectorAll(`template`));

/** @type {HTMLElement} */
const mainContainer = document.querySelector(`.central`);

/** @const {string} */
const ARROW_RIGHT_KEY_CODE = `ArrowRight`;

/** @type {number} */
let listCounter = 0;

/** @param {number} index */
const pasteTemplate = (index) => {
  const content = templates[index].content;
  const newNode = content.cloneNode(true);
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(newNode);
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === ARROW_RIGHT_KEY_CODE) {
    if (listCounter < templates.length) {
      pasteTemplate(listCounter++);
    }
  }
});
