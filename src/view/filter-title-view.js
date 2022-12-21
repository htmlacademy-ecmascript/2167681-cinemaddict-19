import {createElement} from '../render.js';

// контейнер для карточек с фильмом (вкладывается в main-containers-componets-view.js )
const createFilterTitleViewTemplate = () =>
  '<h2 class="films-list__title visually-hidden"></h2>';


export default class NewFilterTitleView {
  #element;

  get template() {
    return createFilterTitleViewTemplate;
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
