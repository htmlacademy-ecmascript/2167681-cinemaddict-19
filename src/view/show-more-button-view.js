import {createElement} from '../render.js';

// кнопка 'показать еще'
const createNewShowMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';


export default class NewShowMoreButtonView {
  #element;

  get template() {
    return createNewShowMoreButtonTemplate;
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
