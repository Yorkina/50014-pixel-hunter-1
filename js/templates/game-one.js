import addElementToPage from '../add-element-to-page';
import getGreeting from './greeting';
import getOption from './options/option';
import getScreen from '../game-switcher';


export function getTemplate(data) {
  return `
    <p class="game__task">${`Угадайте для каждого изображения фото или рисунок?`}</p>
    <form class="game__content">
      ${getOption(data.answers, true)}
    </form>`;
}

export function exportLogic(data, gameLevel) {
  const [type1, type2] = data.answers;
  const element = document.querySelector(`.central`);
  const backButton = element.querySelector(`.back`);
  const [questionFirst, questionSecond] = [...element.querySelectorAll(
      `.game__option`)];
  const answersFirst = [...questionFirst.querySelectorAll(`.game__answer input`)];
  const answersSecond = [...questionSecond.querySelectorAll(`.game__answer input`)];
  const currentAnswers = [];

  const accumulateAnswers = (elements, answerType) => elements.forEach((input) => {
    if (input.checked) {
      currentAnswers.push(input.value === answerType);
    }
    input.disabled = true;
  });

  const firstQuestionHandler = () => {
    accumulateAnswers(answersFirst, type1.picture.type);

    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      getScreen(++gameLevel, correct);
    }
  };

  const secondQuestionHandler = () => {
    accumulateAnswers(answersSecond, type2.picture.type);

    if (currentAnswers.length === 2) {
      const correct = currentAnswers.every((answer) => answer === true);
      getScreen(++gameLevel, correct);
    }
  };

  const buttonHandler = () => {
    addElementToPage(getGreeting());
  };

  backButton.addEventListener(`click`, buttonHandler);
  questionFirst.addEventListener(`change`, firstQuestionHandler);
  questionSecond.addEventListener(`change`, secondQuestionHandler);
}
