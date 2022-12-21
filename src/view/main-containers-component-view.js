import {createElement} from '../render.js';

// компонент для показа карточек по предпочтениям
const createNewMainContainersComponentTemplate = () =>
  `<section class="films-list">
     
   </section>`;

export default class NewMainContainersComponentView {
  #element;

  get template() {
    return createNewMainContainersComponentTemplate;
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


