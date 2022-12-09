import {createElement} from '../render.js';

//главный контейнер с контентом сайта
const createNewFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class NewFilmsMainContainerView {
  getTemplate() {
    return createNewFilmsMainContainerTemplate;
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
