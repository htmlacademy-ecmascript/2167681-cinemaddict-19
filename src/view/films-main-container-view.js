import {createElement} from '../render.js';

//главный контейнер с контентом сайта
const createNewFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class NewFilmsMainContainerView {
  #element;

  get template() {
    return createNewFilmsMainContainerTemplate;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
