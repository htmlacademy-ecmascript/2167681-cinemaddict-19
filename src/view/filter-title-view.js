import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createFilterTitleViewTemplate = (header) =>
  `<h2 class="films-list__title ">${header}</h2>`;


export default class NewFilterTitleView extends AbstractView {

  #currentFilter = null;

  constructor ({currentFilter}) {
    super();
    this.#currentFilter = currentFilter;

  }

  get template() {
    return createFilterTitleViewTemplate(this.#changeHeader());
  }

  // если выбранный фильтр пуст
  #changeHeader = () => {

    switch(this.#currentFilter) {
      case FilterType.ALL:
        return 'There are no movies in our database';
      case FilterType.FAVORITES:
        return 'Your favorites is empty';
      case FilterType.WATCHLIST:
        return 'Your watchlist is empty';
      case FilterType.HISTORY:
        return 'Your history is empty';
    }

  };
}
