import AbstractView from '../framework/view/abstract-view.js';
import {SortMode} from '../const.js';

// сортировка по предпочтениям
function createNewSortsFilmTemplate (currentSort){
  return(
    `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSort === SortMode.DEFAULT ? 'sort__button--active' : ''}"  data-sort-type="${SortMode.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSort === SortMode.BY_DATE ? 'sort__button--active' : ''}" data-sort-type="${SortMode.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSort === SortMode.BY_RATING ? 'sort__button--active' : ''}" data-sort-type="${SortMode.BY_RATING}">Sort by rating</a></li>
  </ul>`);
}

export default class NewSortsFilmView extends AbstractView {

  #onSortChange = null;
  #currentSort = null;

  constructor ({onSortTypeChange, currentSortType}) {
    super();
    this.#onSortChange = onSortTypeChange;
    this.#currentSort = currentSortType;


    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  }

  get template() {
    return createNewSortsFilmTemplate(this.#currentSort);
  }

  // подсветка выбранной сортировки
  #sortTypeChangeHandler = (evt) => {

    if (evt.target.tagName !== 'A') {
      return;
    }
    this.#currentSort = evt.target.dataset.sortType;
    evt.preventDefault();
    createNewSortsFilmTemplate();
    this.#onSortChange(evt.target.dataset.sortType);
  };

}

