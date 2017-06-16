import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getOption from './options/option';
import getScreen from '../game-switcher';
import timer from '../helpers/timer';


const createScreen = (data, gameStatistics, allAnswers) => {
  const [type1, type2] = data.answers;
  let {time, lives, screenNumber, answers} = gameStatistics;

  const getFinishedQuestions = (answersArray) =>
    answersArray.map((answer) =>
      `<li class="stats__result stats__result--${answer}"></li>`
    ).join(``);

  const getFutureAnswers = (answersNumber, currentFinished) =>
    new Array(allAnswers - currentFinished).fill(``).map((answer) =>
      `<li class="stats__result stats__result--unknown"></li>`
    ).join(``);

  const template = `
  ${createHeader(statistics, {time, lives})}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
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
  const [questionFirst, questionSecond] = [...element.querySelectorAll(
      `.game__option`)];
  const answersFirst = [...questionFirst.querySelectorAll(`.game__answer input`)];
  const answersSecond = [...questionSecond.querySelectorAll(`.game__answer input`)];
  const timerElement = element.querySelector(`.game__timer`);
  const currentAnswers = [];

  const accumulateAnswers = (elements, answerType) => elements.forEach((input) => {
    if (input.checked) {
      currentAnswers.push(input.value === answerType);
    } else {
      input.disabled = true;
    }
  });

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
        getScreen(null, {lives, answers});
      }

      deleteTimer();
    }
  };

  const stopTimer = timer(time);

  const firstQuestionHandler = () => {
    accumulateAnswers(answersFirst, type1.picture.type);

    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      saveStatistics(correct, Number(timerElement.innerText));
      deleteTimer();
      getScreen(++screenNumber, {time, lives, screenNumber, answers});
    }
  };

  const secondQuestionHandler = () => {
    accumulateAnswers(answersSecond, type2.picture.type);

    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      saveStatistics(correct, Number(timerElement.innerText));
      deleteTimer();
      getScreen(++screenNumber, {time, lives, screenNumber, answers});
    }
  };

  backButton.addEventListener(`click`, addElementToPage(getGreeting()));
  questionFirst.addEventListener(`change`, firstQuestionHandler);
  questionSecond.addEventListener(`change`, secondQuestionHandler);
  document.addEventListener(`tictac`, tictacHandler);

  return element;
};

export default createScreen;
