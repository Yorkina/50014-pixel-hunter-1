import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import footer from './footer';
import createHeader from './header/header';
import getStats from './stats/game-stats';


const createScreen = (accumulateData) => {
  const template = `
  ${createHeader()}
  <div class="result">
    <h1>Победа!</h1>
    ${getStats()}
  </div>
  ${footer}`;

  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));

  return element;
};

export default createScreen;
