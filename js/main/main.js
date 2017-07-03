import MainView from './main-view';
import Greeting from '../greeting/greeting';
import addElementToPage from '../add-element-to-page';


export default class Main {
  constructor() {
    this.view = new MainView();
    this.init();
  }

  init() {
    this.view.onButtonClick = () => {
      addElementToPage(new Greeting().view);
    };
  }
}
