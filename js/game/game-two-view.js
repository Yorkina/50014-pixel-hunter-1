import getOption from './options/option';
import AbstractView from '../view';


export default class GameTwoView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return `
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content game__content--wide">
        ${getOption(this.answers, true)}
      </form>`;
  }

  bind() {
    const element = this.element.querySelector(`.central`);
    const backButton = element.querySelector(`.back`);
    const form = element.querySelector(`.game__content`);


    backButton.addEventListener(`click`, () => {
      this.buttonHandler();
    });

    form.addEventListener(`change`, (evt) => {
      this.formChangeHandler(evt);
    });
  }

  formChangeHandler(evt) {
    this.onClick(evt.target.value);
  }

  onClick(answer) {
    return answer;
  }

  buttonHandler() {
    window.console.log(`click`);
  }
}

