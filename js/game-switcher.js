import games from './game-data';
import * as twoOnPage from './templates/game-two';
import * as oneOnPage from './templates/game-one';
import * as threeOnPage from './templates/game-three';
import addElementToPage from './add-element-to-page';
import getResult from './templates/result';
import getCalculatedResults from './calc-results';
import tickTimer from './helpers/timer';
import saveLives from './helpers/lives';
import createHeader from './templates/header/header';
import getElementFromTemplate from './get-element-from-template';
import initialStatements from './rules-data';
import footer from './templates/footer';

const gameScreens = [twoOnPage, oneOnPage, threeOnPage];
let bonuses = Array.from(initialStatements.answers);
let typeOfAnswer;
let lives = initialStatements.lives;
let timeout = 0;

const restoreStatements = () => {
  bonuses = Array.from(initialStatements.answers);
  lives = initialStatements.lives;
};

const redrawHeaderTimerElement = (time) => {
  document.querySelector(`.game__timer`).innerHTML = time;
};

const stopTimer = (timer) => {
  clearTimeout(timer);
};

const startTimer = (state, level, isCorrect) => {
  const tick = (timer) => {

    timeout = setTimeout(() => {
      if (timer.time < 0) {
        stopTimer(timeout);
        lives = saveLives(false, lives);
        return;
      }

      redrawHeaderTimerElement(timer.time);
      typeOfAnswer = getTypeOfAnswer(timer.time);

      tick(tickTimer(timer));
    }, 1000);
  };

  tick(state);
};

const getTypeOfAnswer = (timeNum) => {
  if (timeNum > 20) {
    return `fast`;
  }

  if (timeNum < 10) {
    return `slow`;
  }

  return `correct`;
};

const setBonuses = (gameLevel, correct) => {
  const answerBonus = correct ? typeOfAnswer : `wrong`;
  bonuses[gameLevel - 1] = answerBonus;
};

const addCurrentResults = (answersArray) =>
  answersArray.map((answer) =>
    `<li class="stats__result stats__result--${answer}"></li>`
  ).join(``);

const createTemplate = (screenFunc, game, stats) => {
  return getElementFromTemplate(`
    ${createHeader(initialStatements.time, lives)}
      <div class="game">
        ${screenFunc.getTemplate(game)}
        <div class="stats">
          ${addCurrentResults(stats)}
        </div>
      </div>
      ${footer}`);
};

const game = (gameLevel = 0, correct) => {
  stopTimer(timeout);

  const numberOfScreen = games[gameLevel] ?
      games[gameLevel].answers.length - 1 : null;
  setBonuses(gameLevel, correct);

  if (numberOfScreen !== null && lives > 0) {
    addElementToPage(createTemplate(gameScreens[numberOfScreen],
        games[gameLevel], bonuses));

    gameScreens[numberOfScreen].exportLogic(games[gameLevel], gameLevel);
    startTimer(initialStatements, gameLevel, correct);
    lives = saveLives(correct, lives);

  } else {
    addElementToPage(getResult(getCalculatedResults(bonuses, lives)));
    restoreStatements();
  }

};

export default game;
