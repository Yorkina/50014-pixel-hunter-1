import getOption from './options/option';
import AbstractView from '../view';


export default class GameOneView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
    this.currentAnswers = [];
  }

  get template() {
    return `
      <p class="game__task">${`Угадайте для каждого изображения фото или рисунок?`}</p>
      <form class="game__content">
        ${getOption(this.answers, true)}
      </form>`;
  }

  bind() {
    const element = this.element.querySelector(`.central`);
    const backButton = element.querySelector(`.back`);
    const [questionFirst, questionSecond] = [...element.querySelectorAll(
        `.game__option`)];

    backButton.addEventListener(`click`, () => {
      this.buttonHandler();
    });

    questionFirst.addEventListener(`change`, () => {
      this.firstQuestionHandler(questionFirst);
    });

    questionSecond.addEventListener(`change`, () => {
      this.secondQuestionHandler(questionSecond);
    });
  }


  firstQuestionHandler(elements) {
    this.collectAnswers(elements, 0);
  }

  secondQuestionHandler(elements) {
    this.collectAnswers(elements, 1);
  }

  collectAnswers(elements, number) {
    elements.forEach((input) => {
      if (input.checked) {
        this.currentAnswers[number] = input.value;
      }
      input.disabled = true;
    });

    if (this.currentAnswers.length === 2) {
      this.onClick(this.currentAnswers);
    }
  }

  onClick(answers) {
    return answers;
  }

  buttonHandler() {
    window.console.log(`click`);
  }
}

