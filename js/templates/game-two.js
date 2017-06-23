import addElementToPage from '../add-element-to-page';
import getGreeting from './greeting';
import getOption from './options/option';
import getScreen from '../game-switcher';


export function getTemplate(data) {
  return `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      ${getOption(data.answers, true)}
    </form>`;
}

export function exportLogic(data, gameLevel) {
  const element = document.querySelector(`.central`);
  const [type1] = data.answers;
  const backButton = element.querySelector(`.back`);
  const form = element.querySelector(`.game__content`);

  const formChangeHandler = (evt) => {
    const correct = type1.picture.type === evt.target.value;
    getScreen(++gameLevel, correct);
  };

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));
  form.addEventListener(`change`, formChangeHandler);
}
