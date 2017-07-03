import GreetingView from './greeting-view';
import Rules from '../rules/rules';
import addElementToPage from '../add-element-to-page';


export default class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    addElementToPage(this.view);

    this.view.onButtonClick = () => {
      addElementToPage(new Rules().view);
    };
  }
}
