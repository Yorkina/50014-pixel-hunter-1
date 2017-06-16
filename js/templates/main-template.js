import addElementToPage from '../add-element-to-page';
import getElementFromTemplate from '../get-element-from-template';
import getGreeting from './greeting';
import footer from './footer';


const template = `<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
${footer}`;

const main = getElementFromTemplate(template);
const button = main.querySelector(`.intro__asterisk`);

button.addEventListener(`click`, () => addElementToPage(getGreeting()));

export default main;
