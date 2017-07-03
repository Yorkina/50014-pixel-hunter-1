import RulesView from './rules-view';
import Game from '../game/game';
import addElementToPage from '../add-element-to-page';

export default class Rules {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    addElementToPage(this.view);

    this.view.onClick = () => {
      Game.initGame();
    };
  }
}
