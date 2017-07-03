import addElementToPage from '../add-element-to-page';
import twoOnPage from './game-two';
import oneOnPage from './game-one';
import threeOnPage from './game-three';
import {questions, initialState} from '../data/game-data';

export default class Game {
  constructor() {
    this.answers = Array.from(initialState.answers);
    this.level = 0;
  }

  initGame() {
    this.changeLevel();
  }

  changeLevel() {
    const gameLevel = this.getGameScreen();
    addElementToPage(gameLevel(this.answers));
  }

  finishGame() {

  }

  set level(level) {
    this.level = level;
  }

  get level() {
    return this.level;
  }

  getGameScreen() {
    const gameScreens = [twoOnPage, oneOnPage, threeOnPage];
    const numberOfScreen = questions[this.level] ?
       questions[this.level].answers.length - 1 : null;
    return gameScreens[numberOfScreen];
  }
}

// import getCalculatedResults from './calc-results';
// import tickTimer from './helpers/timer';
// import saveLives from './helpers/lives';

// let bonuses = Array.from(initialStatements.answers);
// let typeOfAnswer;
// let lives = initialStatements.lives;
// let timeout = 0;

// const restoreStatements = () => {
//   bonuses = Array.from(initialStatements.answers);
//   lives = initialStatements.lives;
// };

// const redrawHeaderTimerElement = (time) => {
//   document.querySelector(`.game__timer`).innerHTML = time;
// };

// const stopTimer = (timer) => {
//   clearTimeout(timer);
// };

// const startTimer = (state, level, isCorrect) => {
//   const tick = (timer) => {

//     timeout = setTimeout(() => {
//       if (timer.time < 0) {
//         stopTimer(timeout);
//         lives = saveLives(false, lives);
//         return;
//       }

//       redrawHeaderTimerElement(timer.time);
//       typeOfAnswer = getTypeOfAnswer(timer.time);

//       tick(tickTimer(timer));
//     }, 1000);
//   };

//   tick(state);
// };

// const getTypeOfAnswer = (timeNum) => {
//   if (timeNum > 20) {
//     return `fast`;
//   }

//   if (timeNum < 10) {
//     return `slow`;
//   }

//   return `correct`;
// };

// const setBonuses = (gameLevel, correct) => {
//   const answerBonus = correct ? typeOfAnswer : `wrong`;
//   bonuses[gameLevel - 1] = answerBonus;
// };


// const game = (gameLevel, correct) => {
//   stopTimer(timeout);

//   const numberOfScreen = games[gameLevel] ?
//       games[gameLevel].answers.length - 1 : null;
//   setBonuses(gameLevel, correct);

//   if (numberOfScreen !== null && lives > 0) {
//     addElementToPage(createTemplate(gameScreens[numberOfScreen],
//         games[gameLevel], bonuses));

//     gameScreens[numberOfScreen].exportLogic(games[gameLevel], gameLevel, restoreStatements);
//     startTimer(initialStatements, gameLevel, correct);
//     lives = saveLives(correct, lives);

//   } else {
//     addElementToPage(getResult(getCalculatedResults(bonuses, lives)));
//     restoreStatements();
//   }

// };

// export default game;
