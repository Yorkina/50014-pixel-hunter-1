const getLives = (lives) => {
  const diff = lives.start - lives.current;

  return [...Array(lives.start)].map((live, i) =>
    `<img src="img/heart__${i < diff ? `empty` : `full`}.svg"
  class="game__heart" alt="Life" width="32" height="32">`).join(``);
};

const stats = ({lives, time}) =>
  `<h1 class="game__timer">${time}</h1>
    <div class="game__lives">
      ${getLives(lives)}
    </div>`;

export default stats;
