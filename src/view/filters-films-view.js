import AbstractView from '../framework/view/abstract-view.js';
// навигация

const createNavItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`
  <a href="#watchlist" class="main-navigation__item ${currentFilterType === filter.name ? 'main-navigation__item--active' : ''}" data-filter-type = "${type}">${name}
   ${filter.name === 'All movies' ? '' : `<span class="main-navigation__item-count" data-filter-type = "${type}">${count}</span></a>`}`);
};


const createNewNavFilmTemplate = (navItems, currentFilterType) => {
  const navItemsTemplate = navItems
    .map((filter) => createNavItemTemplate(filter, currentFilterType)).join('');

  return(
    `<nav class="main-navigation">
	 ${navItemsTemplate}
   </nav>`);
};


export default class NewFiltersFilmView extends AbstractView {
  #filtersNav = null;
  #currentFilterType = null;
  #onFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filtersNav = filters;
    this.#currentFilterType = currentFilterType;
    this.#onFilterTypeChange = onFilterTypeChange;


    this.element.addEventListener('click', this.#handleFilterTypeChange);
  }

  get template() {
    return createNewNavFilmTemplate(this.#filtersNav, this.#currentFilterType);
  }

  // посветка выбранного фильтра
  #handleFilterTypeChange = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.filterType) {
      this.#onFilterTypeChange(evt.target.dataset.filterType);
    }

  };
}
