import AbstractView from '../framework/view/abstract-view.js';
// навигация

const createNavItemTemplate = (filter) => {
  const {name, count} = filter;

  return (`<a href="#watchlist" class="main-navigation__item">${name}
   <span class="main-navigation__item-count">${count}</span></a>`);
};


const createNewNavFilmTemplate = (navItems) => {
  const navItemsTemplate = navItems
    .map((filter) => createNavItemTemplate(filter)).join('');

  return(
    `<nav class="main-navigation">
	 <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
	 ${navItemsTemplate}
   </nav>`);
};


export default class NewNavFilmView extends AbstractView {
  #filtersNav = null;

  constructor ({filters}) {
    super();
    this.#filtersNav = filters;
  }

  get template() {
    return createNewNavFilmTemplate(this.#filtersNav);
  }
}
