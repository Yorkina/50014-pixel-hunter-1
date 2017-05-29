import addElementToPage from './add-element-to-page';
import getElementFromTemplate from './get-element-from-template';
import greeting from './greeting';
import gameOne from './game-one';
import footer from './footer';
import arrowPrev from './header/arrowPrev';

const createScreen = () => {
  const template = `<header class="header">
  ${arrowPrev}
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

  const element = getElementFromTemplate(template);
  const button = element.querySelector(`.rules__button`);
  const backButton = element.querySelector(`.back`);
  const input = element.querySelector(`.rules__input`);

  const buttonHandler = (evt) => {
    evt.preventDefault();
    addElementToPage(gameOne());
  };

  const inputHandler = (evt) => (button.disabled = !(evt.target.value).trim());
  input.addEventListener(`input`, inputHandler);

  backButton.addEventListener(`click`, () => addElementToPage(greeting()));
  button.addEventListener(`click`, buttonHandler);


  return element;
};

export default createScreen;
