import games from './game-data';
import getGameTwo from './templates/game-two';
import getGameOne from './templates/game-one';
import getGameThree from './templates/game-three';
import addElementToPage from './add-element-to-page';
import getResult from './templates/result';


export default (number, gameStatistics) => {
  const id = `game-screen-${number + 1}`;

  switch (id) {
    case `game-screen-1`:
      addElementToPage(getGameOne(games[number], gameStatistics, games.length));
      break;
    case `game-screen-2`:
      addElementToPage(getGameTwo(games[number], gameStatistics, games.length));
      break;
    case `game-screen-3`:
      addElementToPage(getGameThree(games[number], gameStatistics, games.length));
      break;
    default:
      addElementToPage(getResult());
  }
};
