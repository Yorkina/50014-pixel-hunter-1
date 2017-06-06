import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import footer from './footer';
import header from './header/header';
import getStats from './stats/game-stats';
import getResults from './stats/results';
import getExtra from './stats/extra-points';


const createScreen = () => {
  const template = `
  ${header(``)}
  <div class="result">
    <h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${getStats()}
        </td>
        ${getResults(100, 900)}
      </tr>
      <tr>
        <td></td>
        ${getExtra(`fast`, 1)}
        ${getResults(50, 100)}
      </tr>
      <tr>
        <td></td>
        ${getExtra(`heart`, 2)}
        ${getResults(50, 200)}
      </tr>
      <tr>
        <td></td>
        ${getExtra(`slow`, 2)}
        ${getResults(50, -100)}
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          ${getStats()}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          ${getStats()}
        </td>
        ${getResults(100, 900)}
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
        ${getResults(100, 200)}
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>
  ${footer}`;

  const element = getElementFromTemplate(template);
  const backButton = element.querySelector(`.back`);

  backButton.addEventListener(`click`, () => addElementToPage(getGreeting()));

  return element;
};

export default createScreen;
