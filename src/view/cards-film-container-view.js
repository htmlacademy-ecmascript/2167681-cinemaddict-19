
import AbstractView from '../framework/view/abstract-view.js';

// контейнер для карточек с фильмом (вкладывается в main-containers-componets-view.js )
const createNewCardsFilmContainerTemplate = () =>
  `<div class="films-list__container">
   </div>`;


export default class NewCardsFilmContainerView extends AbstractView {

  get template() {
    return createNewCardsFilmContainerTemplate;
  }

}
