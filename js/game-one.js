import addElementToPage from './add-element-to-page';
import getElementFromTemplate from './get-element-from-template';
import getGreeting from './greeting';
import getGameTwo from './game-two';
import header from './header';
import footer from './footer';


const createScreen = () => {
  const template = `
  ${header}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
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
