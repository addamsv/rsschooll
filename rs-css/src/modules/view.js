import Model from './model';

export default class View extends Model {
  constructor() {
    super();
    this.renderView();
  }

  renderView() {
    return true;
  }
}