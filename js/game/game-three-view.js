import getOption from './options/option';
import AbstractView from '../view';


export default class GameThreeView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return `
      <form class="game__content  game__content--triple">
        ${getOption(this.answers, false)}
      </form>`;
  }

  bind() {
    const element = this.element.querySelector(`.central`);
    const backButton = element.querySelector(`.back`);
    const options = [...element.querySelectorAll(`.game__option`)];

    options.forEach((answer, index) => answer.addEventListener(`click`, () => {
      this.answerClickHandler(index);
    }));

    backButton.addEventListener(`click`, () => {
      this.buttonHandler();
    });
  }

  answerClickHandler(index) {
    this.onClick(index);
  }

  onClick(answer) {
    return answer;
  }

  buttonHandler() {
    window.console.log(`click`);
  }
}
