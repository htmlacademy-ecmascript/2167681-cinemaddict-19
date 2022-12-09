import {createElement} from '../render.js';

// контейнер для карточек с фильмом (вкладывается в main-containers-componets-view.js )
const createNewCardsFilmContainerTemplate = () =>
  `<div class="films-list__container">
   </div>`;


export default class NewCardsFilmContainerView {
  getTemplate() {
    return createNewCardsFilmContainerTemplate;
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
