import {createElement} from '../render.js';

// компонент для показа карточек по предпочтениям
const createNewMainContainersComponentTemplate = () =>
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
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


