import games from './game-data';

export default Object.freeze({
  time: 15,
  lives: 3,
  answers: new Array(games.length).fill(`unknown`)
});
