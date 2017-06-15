import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import getResult from './result';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getOption from './options/option';
import timer from '../helpers/timer';


const createScreen = (data, gameStatistics, allAnswers) => {
  const [type1] = data.answers;
  let {time, lives, screenNumber, answers} = gameStatistics;


  const getFutureAnswers = (answersNumber, currentFinished) =>
    new Array(allAnswers - currentFinished).fill(``).map((answer) =>
      `<li class="stats__result stats__result--unknown"></li>`
    ).join(``);

  const getFinishedQuestions = (answersArray) =>
    answersArray.map((answer) =>
      `<li class="stats__result stats__result--${answer}"></li>`
    ).join(``);

  const template = `
  ${createHeader(statistics, {time, lives})}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${getOption(data.answers, false)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getFinishedQuestions(answers)}
        ${getFutureAnswers(allAnswers, answers.length)}
      </ul>
    </div>
  </div>
  ${footer}`;

  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);
  const options = [...element.querySelectorAll(`.game__option`)];
  const timerElement = element.querySelector(`.game__timer`);

  const getBonusForTime = (currentTime) => {
    if (currentTime > 10) {
      return `fast`;
    }

    if (currentTime < 20) {
      return `slow`;
    }

    return `correct`;
  };

  const saveStatistics = (correct, currentTime) => {
    const answerBonus = correct ? getBonusForTime(currentTime) : `wrong`;
    lives = correct ? lives : --lives;
    answers = answers.concat([answerBonus]);
  };

  const deleteTimer = () => {
    stopTimer();
    document.removeEventListener(`tictac`, tictacHandler);
  };


  const tictacHandler = () => {
    let timerTime = Number(timerElement.innerText);
    timerElement.innerText = --timerTime;

    if (timerTime === 0) {
      saveStatistics(false, timerTime);
      addElementToPage(getResult({time, lives, screenNumber, answers}));

      deleteTimer();
    }
  };

  const stopTimer = timer(time);

  const answerClickHandler = (evt) => {
    const correct = type1.picture.type === evt.target.dataset.value;
    saveStatistics(correct, Number(timerElement.innerText));
    deleteTimer();
    addElementToPage(getResult({time, lives, screenNumber, answers}));
  };


  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  options.forEach((answer) => answer.addEventListener(`click`, answerClickHandler));
  document.addEventListener(`tictac`, tictacHandler);

  return element;
};

export default createScreen;
