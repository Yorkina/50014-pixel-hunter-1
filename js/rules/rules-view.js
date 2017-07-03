import AbstractView from '../view';
import footer from '../footer/footer';


export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
    </header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    ${footer}`;
  }

  bind() {
    const button = this.element.querySelector(`.rules__button`);
    const backButton = this.element.querySelector(`.back`);
    const input = this.element.querySelector(`.rules__input`);

    input.addEventListener(`input`, (evt) => {
      this.inputHandler(evt, button);
    });

    backButton.addEventListener(`click`, () => {
      this.buttonHandler();
    });

    button.addEventListener(`click`, (evt) => {
      this.onClick(evt);
    });
  }

  onClick(evt) {
    evt.preventDefault();

  }

  inputHandler(evt, button) {
    button.disabled = !(evt.target.value).trim();
  }

  buttonHandler() {
    window.console.log(`click`);
  }
}
