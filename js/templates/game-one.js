import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import data from '../game-data';
import getGreeting from './greeting';
import getGameTwo from './game-two';
import createHeader from './header/header';
import statistics from './header/statistics';
import getResults from './stats/game-stats';
import footer from './footer';
import getOption from './options/option';


const createScreen = () => {
  const template = `
  ${createHeader(statistics)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${getOption(data[0].answers)}
    </form>
    <div class="stats">
      ${getResults()}
    </div>
  </div>
  ${footer}`;


  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);
  const [questionFirst, questionSecond] = [...element.querySelectorAll(
      `.game__option`)];
  const answersFirst = [...questionFirst.querySelectorAll(`.game__answer input`)];
  const answersSecond = [...questionSecond.querySelectorAll(`.game__answer input`)];
  const inputs = [...element.querySelectorAll(`input`)];

  const shouldGoToNextScreen = (elements) => elements.filter(
      ({checked}) => checked).length === 2;

  const firstQuestionHandler = () => {
    answersFirst.forEach((answer) => (answer.disabled = true));

    if (shouldGoToNextScreen(inputs)) {
      addElementToPage(getGameTwo());
    }
  };

  const secondQuestionHandler = () => {
    answersSecond.forEach((answer) => (answer.disabled = true));

    if (shouldGoToNextScreen(inputs)) {
      addElementToPage(getGameTwo());
    }
  };

  backButton.addEventListener(`click`, addElementToPage(getGreeting()));
  questionFirst.addEventListener(`change`, firstQuestionHandler);
  questionSecond.addEventListener(`change`, secondQuestionHandler);

  return element;
};

export default createScreen;
