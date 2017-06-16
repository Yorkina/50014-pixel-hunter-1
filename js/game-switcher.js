import games from './game-data';
import getGameTwo from './templates/game-two';
import getGameOne from './templates/game-one';
import getGameThree from './templates/game-three';
import addElementToPage from './add-element-to-page';
import getResult from './templates/result';
import getCalculatedResults from './calc-results';
import statsData from './stats-data';


export default (number, gameStatistics) => {
  const numberOfScreen = games[number] ? games[number].answers.length : 0;

  switch (numberOfScreen) {
    case 1:
      addElementToPage(getGameTwo(games[number], gameStatistics, games.length));
      break;
    case 2:
      addElementToPage(getGameOne(games[number], gameStatistics, games.length));
      break;
    case 3:
      addElementToPage(getGameThree(games[number], gameStatistics, games.length));
      break;
    default:
      const {lives, answers} = gameStatistics;
      new Array(lives).fill(``).forEach((live) => answers.push(`heart`));
      statsData.push({answers});
      addElementToPage(getResult(getCalculatedResults(statsData)));
  }
};
