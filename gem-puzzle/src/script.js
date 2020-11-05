import Controller from './modules/controller';
import Model from './modules/model';
import View from './modules/render.view.model';

import './modules/components';

const controller = new Controller();
controller.log();

const model = new Model();
model.log();

const view = new View();
document.addEventListener("DOMContentLoaded", () => {
  view.render();
});
