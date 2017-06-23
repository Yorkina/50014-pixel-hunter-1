import addElementToPage from '../add-element-to-page';
import getGreeting from './greeting';
import getScreen from '../game-switcher';
import getOption from './options/option';


export function getTemplate(data) {
  return `
    <form class="game__content  game__content--triple">
      ${getOption(data.answers, false)}
    </form>`;
}

export function exportLogic(data, gameLevel) {
  const element = document.querySelector(`.central`);
  const [type1] = data.answers;
  const backButton = element.querySelector(`.back`);
  const options = [...element.querySelectorAll(`.game__option`)];

  const answerClickHandler = (evt) => {
    const correct = type1.picture.type === evt.target.dataset.value;
    getScreen(++gameLevel, correct);
  };

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  options.forEach((answer) => answer.addEventListener(`click`, answerClickHandler));
}
