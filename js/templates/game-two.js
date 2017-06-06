import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import data from '../game-data';
import getGreeting from './greeting';
import getGameThree from './game-three';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getResults from './stats/game-stats';
import getOption from './options/option';


const createScreen = () => {
  const template = `
  ${createHeader(statistics)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      ${getOption(data[1].answers)}
    </form>
    <div class="stats">
      ${getResults()}
    </div>
  </div>
  ${footer}`;


  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);
  const form = element.querySelector(`.game__content`);

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  form.addEventListener(`change`, () => addElementToPage(getGameThree()));

  return element;
};

export default createScreen;
