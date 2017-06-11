import games from './game-data';
import getGameTwo from './templates/game-two';
import getGameOne from './templates/game-one';
import getGameThree from './templates/game-three';
import addElementToPage from './add-element-to-page';
import getResult from './templates/result';


export default (number, gameStatistics) => {
  const id = `game-` + number;

  const screenData = games.filter((game) => {
    return game.screen === id;
  });

  switch (id) {
    case `game-1`:
      addElementToPage(getGameOne(screenData[0], gameStatistics, games.length));
      break;
    case `game-2`:
      addElementToPage(getGameTwo(screenData[0], gameStatistics, games.length));
      break;
    case `game-3`:
      addElementToPage(getGameThree(screenData[0], gameStatistics, games.length));
      break;
    default:
      getResult();
  }
};
