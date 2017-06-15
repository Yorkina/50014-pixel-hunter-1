import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getOption from './options/option';
import getScreen from '../game-switcher';
import getResult from './result';
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
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      ${getOption(data.answers, true)}
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
  const form = element.querySelector(`.game__content`);
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

      if (lives > 0) {
        getScreen(++screenNumber, {time, lives, screenNumber, answers});
      } else {
        addElementToPage(getResult({time, lives, screenNumber, answers}));
      }

      deleteTimer();
    }
  };

  const stopTimer = timer(time);

  const formChangeHandler = (evt) => {
    const correct = type1.picture.type === evt.target.value;
    saveStatistics(correct, Number(timerElement.innerText));
    deleteTimer();
    getScreen(++screenNumber, {time, lives, screenNumber, answers});
  };

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  form.addEventListener(`change`, formChangeHandler);
  document.addEventListener(`tictac`, tictacHandler);

  return element;
};

export default createScreen;
