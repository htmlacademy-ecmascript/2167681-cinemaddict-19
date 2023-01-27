import {render, RenderPosition} from '../framework/render.js';
import {updateItem, sortRating, sortDate} from '../utils/common.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';
import FilmsCardPresenter from './films-card-presenter.js';
import FilmsPopupPresenter from './films-popup-presenter.js';
import NewSortsFilmView from '../view/sort-view.js';
import {SortMode} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmsMainContainer = new NewFilmsMainContainerView();
  #mainContainersComponent = new NewMainContainersComponentView();
  #cardsContainer = new NewCardsFilmContainerView();
  #filterTitleView = new NewFilterTitleView();
  #filmContainer;
  #filmInfoModel;
  #mainBody = null;
  #cardFilms = [];
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;
  #filmCardPresenter = null;
  #filmsPopupPresenter = null;
  #filmCardPresenters = new Map();
  #currentSortType = SortMode.DEFAULT;
  #sortComponent = null;
  #sourcedFilmCard = [];


  constructor({filmContainer, filmInfoModel, mainBody}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#renderMainContainer();
    this.#sourcedFilmCard = [...this.#filmInfoModel.cards];
  }


  #connectFilmsPopupPresenter = (card) => {

    if(this.#filmsPopupPresenter) {
      this.#filmsPopupPresenter.destroy();
    }

    this.#filmsPopupPresenter = new FilmsPopupPresenter({
      mainBody: this.#mainBody,
      changeWatchlist: this.#changeWatchlist,
      changeFavorite: this.#changeFavorite,
      changeAlredyWatched: this.#changeAlredyWatched,
    });
    this.#filmsPopupPresenter.init(card);
  };


  #connectFilmCardsPresenter() {

    this.#filmCardPresenter = new FilmsCardPresenter({
      cardsContainer: this.#cardsContainer.element,
      mainContainersComponent: this.#mainContainersComponent.element,
      loadMoreButtonClickHandler: this.#loadMoreButtonClickHandler,
      popUpPresenter:  this.#connectFilmsPopupPresenter,
      changeWatchlist: this.#changeWatchlist,
      changeFavorite: this.#changeFavorite,
      changeAlredyWatched: this.#changeAlredyWatched,
      mainBody: this.#mainBody,
    });
  }

  //функция кнопки 'show more'
  #loadMoreButtonClickHandler = () => {
    this.#cardFilms
      .slice(this.#arrayFilmsCount, this.#arrayFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#arrayFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#arrayFilmsCount >= this.#cardFilms.length) {
      this.#mainContainersComponent.element.querySelector('.films-list__show-more')
        .classList.add('visually-hidden');
    }
  };

  #renderEmptyTittle () {
    this.#filterTitleView.element.textContent = 'There are no movies in our database';
    this.#mainContainersComponent.element.querySelector('.films-list__title').classList.remove('visually-hidden');
  }

  //отрисовка главного контайнера
  #renderMainContainer() {
    this.#renderSort();
    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);
    render(this.#filterTitleView, this.#mainContainersComponent.element, RenderPosition.AFTERBEGIN);


    this.#renderFilms();
  }

  clearFilmList() {
    this.#filmCardPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#filmCardPresenters.clear();
    this.#arrayFilmsCount = FILMS_COUNT_PER_STEP;

  }

  #renderCards(from, to) {
    this.#cardFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  }

  // отрисовка фильмов по умолчанию
  #renderFilms = () => {
    if (this.#cardFilms.length === 0) {
      this.#renderEmptyTittle();
    } else {
      this.#renderCards(0, Math.min(this.#cardFilms.length, FILMS_COUNT_PER_STEP));
    }

    if (this.#cardFilms.length > FILMS_COUNT_PER_STEP) {
      this.#filmCardPresenter.renderShowMoreButton();
    }

  };


  //сортировка фильмов
  #sortFilmCards = (sortMode) => {

    switch(sortMode) {
      case SortMode.BY_DATE:
        this.#cardFilms.sort(sortDate);
        break;

      case SortMode.BY_RATING:
        this.#cardFilms.sort(sortRating);
        break;

      case SortMode.DEFAULT:
        this.#cardFilms = [...this.#sourcedFilmCard];
        break;
    }

    this.#currentSortType = sortMode;
  };


  #handleSortTypeChange = (sortMode) => {
    if(this.#currentSortType === sortMode) {
      return;
    }

    this.#sortFilmCards(sortMode);
    this.clearFilmList();
    this.#renderFilms();

  };

  #renderSort = () => {

    this.#sortComponent = new NewSortsFilmView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#filmContainer);
  };

  // функция отрисовки карточек
  #renderCard(cards) {
    this.#connectFilmCardsPresenter();
    this.#filmCardPresenter.init(cards);
    this.#filmCardPresenters.set(cards.id, this.#filmCardPresenter);
  }

  // функция изменения данных во вью
  #handleFilmChange = (updateFilm) => {
    this.#cardFilms = updateItem(this.#cardFilms, updateFilm);
    this.#filmCardPresenters.get(updateFilm.id).init(updateFilm);
    if (this.#filmsPopupPresenter) {
      this.#filmsPopupPresenter.init(updateFilm);
    }

  };

  //функции для изменение данных в моделях
  #changeWatchlist = (data) => {
    this.#handleFilmChange({...data,userDetails:{...data.userDetails, watchlist: !data.userDetails.watchlist}});
  };

  #changeFavorite = (data) => {
    this.#handleFilmChange({...data,userDetails:{...data.userDetails, favorite: !data.userDetails.favorite}});
  };

  #changeAlredyWatched = (data) => {
    this.#handleFilmChange({...data,userDetails:{...data.userDetails, alreadyWatched: !data.userDetails.alreadyWatched}});
  };
}
