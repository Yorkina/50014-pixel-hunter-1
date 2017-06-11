import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import createHeader from './header/header';
import statistics from './header/statistics';
import footer from './footer';
import getOption from './options/option';
import getScreen from '../game-switcher';
import timer from '../helpers/timer';
import getResult from './result';


const createScreen = (data, gameStatistics) => {
  const [type1, type2] = data.answers;
  let {time, lives, screenNumber, answers} = gameStatistics;

  const getAnswers = (answersArray) => {
    return answersArray.map((answer) => {
      return `<li class="stats__result stats__result--${answer || `unknown`}"></li>`;
    }).join(``);
  };

  const template = `
  ${createHeader(statistics, {time, lives})}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${getOption(data.answers, true)}
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

  const saveStatistics = (correct) => {
    const answerBonus = correct ? `correct` : `wrong`;
    const timeBonus = Number(timerElement.innerText) > 10 ? `fast` : `slow`;

    lives.current = correct ? lives.current : --lives.current;
    answers = answers.concat([answerBonus, timeBonus]);
  };

  const timeIsOverHandler = () => {
    saveStatistics(false);

    if (lives.current > 0) {
      getScreen(++screenNumber, {time, lives, screenNumber, answers});
    } else {
      addElementToPage(getResult({time, lives, screenNumber, answers}));
    }
  };

  const stopTimer = timer(timerElement, time, timeIsOverHandler);

  const firstQuestionHandler = () => {
    accumulateAnswers(answersFirst, type1.picture.type);

    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      saveStatistics(correct);
      stopTimer();
      getScreen(++screenNumber, {time, lives, screenNumber, answers});
    }
  };

  const secondQuestionHandler = () => {
    accumulateAnswers(answersSecond, type2.picture.type);


    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      saveStatistics(correct);
      stopTimer();
      getScreen(++screenNumber, {time, lives, screenNumber, answers});
    }
  };

  backButton.addEventListener(`click`, addElementToPage(getGreeting()));
  questionFirst.addEventListener(`change`, firstQuestionHandler);
  questionSecond.addEventListener(`change`, secondQuestionHandler);
  document.addEventListener(`timeIsOver`, timeIsOverHandler);

  return element;
};

export default createScreen;
