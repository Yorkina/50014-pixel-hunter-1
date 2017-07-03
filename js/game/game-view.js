import AbstractView from '../view';


export default class GameView extends AbstractView {
  constructor(data, gameLevel, view) {
    super();
    this.data = data;
    this.gameLevel = gameLevel;
    this.view = view;
  }

  get template() {
    return `
      ${this.drawHeader(15, 3)}
       <div class="game">
         ${this.view(this.data, this.gameLevel)}
         <div class="stats">
           ${this.addCurrentResults([`fast`, `slow`, `correct`])}
         </div>
       </div>
       <footer class="footer">
        <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
        <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
        <div class="footer__social-links">
          <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
          <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
          <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
          <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
        </div>
      </footer>`;
  }

  addCurrentResults(answersArray) {
    return answersArray.map((answer) =>
      `<li class="stats__result stats__result--${answer}"></li>`
    ).join(``);
  }

  drawHeader(time, lives) {
    return `<header class="header">
        <div class="header__back">
          <span class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.png" width="101" height="44">
          </span>
        </div>
        ${(time && lives) ? this.drawStatistics(time, lives) : ``}
      </header>`;
  }

  drawStatistics(time, lives) {
    return `
      <h1 class="game__timer">${time}</h1>
      <div class="game__lives">
        ${this.getLives(lives)}
      </div>`;
  }

  getLives(lives) {
    const diff = 3 - lives;

    return new Array(3).fill(``).map((live, i) => {
      const src = `src="img/heart__${i < diff ? `empty` : `full`}.svg"`;
      return `<img ${src} class="game__heart" alt="Life" width="32" height="32">`;
    }).join(``);
  }

  bind() {

  }
}
