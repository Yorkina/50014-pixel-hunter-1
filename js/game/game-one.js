import GameOneView from './game-one-view';

export default class GameOne {
  constructor(data) {
    this.view = new GameOneView(data);
  }

  get view() {
    return this.view;
  }
}
