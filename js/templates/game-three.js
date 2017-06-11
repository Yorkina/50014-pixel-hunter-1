import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import getResult from './result';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getOption from './options/option';
import timer from '../helpers/timer';


const createScreen = (data, gameStatistics) => {
  const [type1] = data.answers;
  let {time, lives, screenNumber, answers} = gameStatistics;


  const getAnswers = (answersArray) => {
    return answersArray.map((answer) => {
      return `<li class="stats__result stats__result--${answer || `unknown`}"></li>`;
    }).join(``);
  };

  const template = `
  ${createHeader(statistics, {time, lives})}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${getOption(data.answers, false)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getAnswers(answers)}
      </ul>
    </div>
  </div>
  ${footer}`;

  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);
  const options = [...element.querySelectorAll(`.game__option`)];
  const timerElement = element.querySelector(`.game__timer`);

  const saveStatistics = (correct) => {
    const answerBonus = correct ? `correct` : `wrong`;
    const timeBonus = Number(timerElement.innerText) > 10 ? `fast` : `slow`;

    lives.current = correct ? lives.current : --lives.current;
    answers = answers.concat([answerBonus, timeBonus]);
  };

  const timeIsOverHandler = () => {
    saveStatistics(false);
    addElementToPage(getResult({time, lives, screenNumber, answers}));
  };

  const stopTimer = timer(timerElement, time, timeIsOverHandler);

  const answerClickHandler = (evt) => {
    const correct = type1.picture.type === evt.target.dataset.value;
    saveStatistics(correct);
    stopTimer();
    addElementToPage(getResult({time, lives, screenNumber, answers}));
  };


  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  options.forEach((answer) => answer.addEventListener(`click`, answerClickHandler));
  document.addEventListener(`timeIsOver`, timeIsOverHandler);

  return element;
};

export default createScreen;
