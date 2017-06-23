import rules from '../../rules-data';

const getLives = (lives) => {
  const diff = rules.lives - lives;

  return new Array(rules.lives).fill(``).map((live, i) => {
    const src = `src="img/heart__${i < diff ? `empty` : `full`}.svg"`;
    return `<img ${src} class="game__heart" alt="Life" width="32" height="32">`;
  }).join(``);
};

const stats = ({lives, time}) =>
  `<h1 class="game__timer">${time}</h1>
    <div class="game__lives">
      ${getLives(lives)}
    </div>`;

export default stats;
