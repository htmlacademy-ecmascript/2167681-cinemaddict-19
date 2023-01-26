import AbstractView from '../framework/view/abstract-view.js';
//import {SortMode} from '../const.js';


// сортировка по предпочтениям
function createNewFiltersFilmTemplate (){
  return(
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="byDate">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="byRating">Sort by rating</a></li>
  </ul>`);
}

export default class NewFiltersFilmView extends AbstractView {

  #sortChange = null;

  constructor ({onSortTypeChange}) {
    super();
    this.#sortChange = onSortTypeChange;

    this.element.addEventListener('click', (evt) => {
      if (evt.target.closest('.sort__button')) {
        document.querySelector('.sort__button--active').classList.remove('sort__button--active');
        evt.target.classList.add('sort__button--active');
        evt.preventDefault();
        this.#sortTypeChangeHendler(evt);
      }

    });

  }


  get template() {
    return createNewFiltersFilmTemplate;
  }

  #sortTypeChangeHendler = (evt) => {
    this.#sortChange(evt.target.dataset.sortType);
  };

}

