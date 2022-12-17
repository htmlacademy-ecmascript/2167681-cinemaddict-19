import {createElement} from '../render.js';

// контейнер для карточек с фильмом (вкладывается в main-containers-componets-view.js )
const createNewCardsFilmContainerTemplate = () =>
  `<div class="films-list__container">
   </div>`;


export default class NewCardsFilmContainerView {
  #element;

  get template() {
    return createNewCardsFilmContainerTemplate;
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
