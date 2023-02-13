import {render, RenderPosition, remove} from '../framework/render.js';
import { sortRating, sortDate} from '../utils/common.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';
import FilmsCardPresenter from './films-card-presenter.js';
import FilmsPopupPresenter from './films-popup-presenter.js';
import NewSortsFilmView from '../view/sort-film-view.js';
import LoadingView from '../view/loading-view.js';
import {FilterType, SortMode, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filters.js';
import NewUserRangView from '../view/user-rang-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const FILMS_COUNT_PER_STEP = 5;

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ContentPresenter {
  #filmsMainContainer = new NewFilmsMainContainerView();
  #mainContainersComponent = new NewMainContainersComponentView();
  #cardsContainer = new NewCardsFilmContainerView();
  #header = null;
  #filterTitleView = null;
  #loadingComponent = new LoadingView();
  #userRangView = null;
  #filmContainer;
  #filmInfoModel;
  #mainBody = null;
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;
  #filmCardPresenter = null;
  #filmsPopupPresenter = null;
  #filmCardPresenters = new Map();
  #currentSortType = SortMode.DEFAULT;
  #sortComponent = null;
  #filterFilmModel = null;
  #isLoading = true;
  #filmsCommentsModel = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });


  constructor({header, filmContainer, filmInfoModel, mainBody, filterFilmModel, filmsCommentsModel}) {
    this.#header = header;
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
    this.#filterFilmModel = filterFilmModel;
    this.#filmsCommentsModel = filmsCommentsModel;

    this.#filmInfoModel.addObserver(this.#handleModeEvent);
    this.#filterFilmModel.addObserver(this.#handleModeEvent);
    this.#filmsCommentsModel.addObserver(this.#handleModeEvent);
  }


  get films () {
    const filterType = this.#filterFilmModel.filter;
    const films = this.#filmInfoModel.getCards();

    const filteredFilms = filter[filterType](films);

    switch(this.#currentSortType) {
      case SortMode.BY_DATE:
        return filteredFilms.sort(sortDate);

      case SortMode.BY_RATING:
        return filteredFilms.sort(sortRating);
    }
    return filteredFilms;
  }


  init() {
    this.#renderMainContainer();
  }

  //отрисовка главного контайнера
  #renderMainContainer() {
    this.#renderUserRang();
    this.#renderSort();
    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);
    this.#renderFilterTitleView();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_COUNT_PER_STEP));

    if (filmsCount === 0) {
      this.#filterTitleView.element.classList.remove('visually-hidden');

    } else {
      this.#filterTitleView.element.classList.add('visually-hidden');
      this.#renderCardsFilms(films);
    }

    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#filmCardPresenter.renderShowMoreButton();
    }
  }

  #connectFilmCardsPresenter() {

    this.#filmCardPresenter = new FilmsCardPresenter({
      cardsContainer: this.#cardsContainer.element,
      mainContainersComponent: this.#mainContainersComponent.element,
      loadMoreButtonClickHandler: this.#loadMoreButtonClickHandler,
      popUpPresenter:  this.#connectFilmsPopupPresenter,
      changeWatchlist: this.#onChangeWatchlist,
      changeFavorite: this.#onChangeFavorite,
      changeAlredyWatched: this.#onChangeAlredyWatched,
      mainBody: this.#mainBody,
      filmsCommentsModel: this.#filmsCommentsModel,
    });
  }

  #renderFilterTitleView = () => {


    this.#filterTitleView = new NewFilterTitleView({
      currentFilter: this.#filterFilmModel.filter
    });
    render(this.#filterTitleView, this.#mainContainersComponent.element, RenderPosition.AFTERBEGIN);

  };

  #connectFilmsPopupPresenter = (card) => {

    if(this.#filmsPopupPresenter) {
      this.#filmsPopupPresenter.destroy();
    }

    this.#filmsPopupPresenter = new FilmsPopupPresenter({
      mainBody: this.#mainBody,
      changeWatchlist: this.#onChangeWatchlist,
      changeFavorite: this.#onChangeFavorite,
      changeAlredyWatched: this.#onChangeAlredyWatched,
      filmsCommentsModel:this.#filmsCommentsModel,
      deleteComment: this.#onDeleteComment,
      addComment: this.#onAddComment,
    });
    this.#filmsPopupPresenter.init(card);
  };

  #renderUserRang () {
    if (this.#userRangView) {
      remove(this.#userRangView);
    }

    this.#userRangView = new NewUserRangView({
      filmModel: this.#filmInfoModel
    });

    render(this.#userRangView, this.#header);

  }

  #renderSort = () => {
    this.#sortComponent = new NewSortsFilmView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#filmContainer);
  };


  //функция кнопки 'show more'
  #loadMoreButtonClickHandler = () => {
    const filmsCount = this.films.length;
    const renderCount = Math.min(filmsCount, this.#arrayFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#arrayFilmsCount, renderCount);

    this.#renderCardsFilms(films);

    this.#arrayFilmsCount = renderCount;

    if (this.#arrayFilmsCount >= filmsCount) {
      this.#mainContainersComponent.element.querySelector('.films-list__show-more')
        .classList.add('visually-hidden');
    }
  };


  #renderCardsFilms = (cards) => cards.forEach((card) => this.#renderCardFilm(card));

  //очистка списка фильмов
  #clearBoard({resetRenderFilmsCount = false, resetSortType = false} = {}) {
    const taskCount = this.films.length;

    this.#filmCardPresenters.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenters.clear();

    remove(this.#userRangView);
    remove(this.#filmsMainContainer);
    remove(this.#sortComponent);
    remove(this.#filterTitleView);
    remove(this.#loadingComponent);

    if (resetRenderFilmsCount) {
      this.#arrayFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#arrayFilmsCount = Math.min(taskCount, this.#arrayFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortMode.DEFAULT;
    }
  }

  // переключение сортировки
  #handleSortTypeChange = (sortMode) => {
    if(this.#currentSortType === sortMode) {
      return;
    }

    this.#currentSortType = sortMode;
    this.#clearBoard({resetRenderFilmsCount: true});
    this.#renderMainContainer();

  };


  // функция отрисовки карточек
  #renderCardFilm(cards) {
    this.#connectFilmCardsPresenter();
    this.#filmCardPresenter.init(cards);
    this.#filmCardPresenters.set(cards.id, this.#filmCardPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainersComponent.element);
  }


  #handleModeEvent = (updateType, data) => {

    switch(updateType) {
      case UpdateType.PATCH:
        this.#renderUserRang();
        this.#filmCardPresenters.get(data.id).init(data);
        if (this.#filmsPopupPresenter) {
          this.#filmsPopupPresenter.init(data);
        }
        break;
      case UpdateType.MINOR:
        if (this.#filmsPopupPresenter) {
          this.#filmsPopupPresenter.init(data);
        }
        this.#clearBoard();
        this.#renderMainContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderFilmsCount: true, resetSortType: true});
        this.#renderMainContainer();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard({resetRenderFilmsCount: true, resetSortType: true});
        this.#renderMainContainer();
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch(actionType) {
      case UserAction.UPDATE_FILM:
        try{
          if (this.#filmsPopupPresenter) {
            this.#filmsPopupPresenter.setSaving();
          }
          await this.#filmInfoModel.updateFilm(updateType,update);
        } catch (err) {
          if (this.#filmsPopupPresenter && this.#filmsPopupPresenter.isOpen === true) {
            this.#filmsPopupPresenter.setAborting(update.idToError);
          } else {
            this.#filmCardPresenters.get(update.id).setAborting();
          }}
        break;

      case UserAction.ADD_COMMENT:
        try {this.#filmsPopupPresenter.setSaving();
          await this.#filmsCommentsModel.addComment(updateType,update);
        } catch (err) {
          this.#filmsPopupPresenter.setAborting(update.idToError);
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {this.#filmsPopupPresenter.setDeleting(update.id);
          await this.#filmsCommentsModel.deleteComment(updateType,update);
        } catch (err) {
          this.#filmsPopupPresenter.setAborting(update.idToError);
        }
        break;

    }
    this.#uiBlocker.unblock();
  };

  //функции для изменение данных в моделях
  #onAddComment = (data) => {
    this.#handleViewAction(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data);

  };

  #onDeleteComment = (data) => {
    this.#handleViewAction(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      data);

  };


  #onChangeWatchlist = (data) => {
    const filterType = this.#filterFilmModel.filter;
    const currentUpdateType = filterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;

    this.#handleViewAction(
      UserAction.UPDATE_FILM,
      currentUpdateType,
      {...data,userDetails:{...data.userDetails, watchlist: !data.userDetails.watchlist}});
  };

  #onChangeFavorite = (data) => {
    const filterType = this.#filterFilmModel.filter;
    const currentUpdateType = filterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;

    this.#handleViewAction(
      UserAction.UPDATE_FILM,
      currentUpdateType,
      {...data,userDetails:{...data.userDetails, favorite: !data.userDetails.favorite}});
  };

  #onChangeAlredyWatched = (data) => {
    const filterType = this.#filterFilmModel.filter;
    const currentUpdateType = filterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#handleViewAction(
      UserAction.UPDATE_FILM,
      currentUpdateType,
      {...data,userDetails:{...data.userDetails, alreadyWatched: !data.userDetails.alreadyWatched}});
  };
}
