import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import data from '../game-data';
import getGreeting from './greeting';
import getResult from './result';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getResults from './stats/game-stats';
import getOption from './options/option';


const createScreen = () => {
  const template = `
  ${createHeader(statistics)}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${getOption(data[2].answers)}
    </form>
    <div class="stats">
      ${getResults()}
    </div>
  </div>
  ${footer}`;

  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);
  const answers = [...element.querySelectorAll(`.game__option`)];

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  answers.forEach((answer) => answer.addEventListener(`click`,
      () => addElementToPage(getResult())));

  return element;
};

export default createScreen;
