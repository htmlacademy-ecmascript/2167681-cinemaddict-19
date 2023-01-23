import AbstractView from '../framework/view/abstract-view.js';
// сортировка по предпочтениям
const createNewFiltersFilmTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button--inactive">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--inactive">Sort by rating</a></li>
  </ul>`;

export default class NewFiltersFilmView extends AbstractView {

  get template() {
    return createNewFiltersFilmTemplate;
  }
}

