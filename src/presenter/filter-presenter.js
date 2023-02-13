import NewFiltersFilmView from '../view/filters-films-view.js';
import {filter} from '../utils/filters.js';
import {render, remove, replace, RenderPosition} from '../framework/render.js';
import { FilterType, UpdateType } from '../const';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmModel = null;


  #filterComponent = null;


  constructor({filterContainer, filterFilmModel, filmInfoModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterFilmModel;
    this.#filmModel = filmInfoModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {

    const films = this.#filmModel.getCards();
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }

  init() {

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;


    this.#filterComponent = new NewFiltersFilmView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange:  this.#handleFilterTypeChange,
    });

    render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent, );
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };


  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel === filterType){
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
