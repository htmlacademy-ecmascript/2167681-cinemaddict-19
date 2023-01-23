import {render, RenderPosition, remove} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';
import FilmsCardPresenter from './films-card-presenter.js';
import FilmsPopupPresenter from './films-popup-presenter.js';
import NewFiltersFilmView from '../view/filters-view.js';
import {ACTIVATE_MODE} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;


export default class ContentPresenter {
  #filmsMainContainer = new NewFilmsMainContainerView();
  #mainContainersComponent = new NewMainContainersComponentView();
  #cardsContainer = new NewCardsFilmContainerView();
  #filterTitleView = new NewFilterTitleView();
  #filtersFilmView = new NewFiltersFilmView();
  #filmContainer;
  #filmInfoModel;
  #mainBody = null;
  #cardFilms = [];
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;
  #filmCardPresenter = null;
  #filmsPopupPresenter = null;
  #filmCardPresenters = new Map();
  #popupPresenterMap = new Map();
  #popupStatus = ACTIVATE_MODE[1];


  constructor({filmContainer, filmInfoModel, mainBody}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#renderMainContainer();

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
      popupStatus: this.#popupStatus
    });
    this.#filmsPopupPresenter.init(card);
    this.#popupStatus = this.#filmsPopupPresenter.popupStatus;
    this.#popupPresenterMap.set(card.id, this.#filmsPopupPresenter);
    if (this.#popupPresenterMap.size >= 1) {
      this.#popupPresenterMap.clear();
      this.#popupPresenterMap.set(card.id, this.#filmsPopupPresenter);
    } else {
      this.#popupPresenterMap.set(card.id, this.#filmsPopupPresenter);
    }
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
    render(this.#filtersFilmView, this.#filmContainer);
    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);
    render(this.#filterTitleView, this.#mainContainersComponent.element, RenderPosition.AFTERBEGIN);

    if (this.#cardFilms.length === 0) {
      this.#renderEmptyTittle();
    } else {
      this.#renderCards(0, Math.min(this.#cardFilms.length, FILMS_COUNT_PER_STEP));
    }

    if (this.#cardFilms.length > FILMS_COUNT_PER_STEP) {
      this.#filmCardPresenter.renderShowMoreButton();
    }

  }

  clearFilmList() {
    this.#filmCardPresenters.forEach((presenter) => {
      presenter.destroy();
      this.#filmCardPresenters.clear();
      this.#arrayFilmsCount = FILMS_COUNT_PER_STEP;
      remove(this.#filmCardPresenter.renderShowMoreButton());
    });
  }

  #renderCards(from, to) {
    this.#cardFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  }


  // функция отрисовки карточек
  #renderCard(cards) {
    this.#connectFilmCardsPresenter();
    this.#filmCardPresenter.init(cards);
    this.#filmCardPresenters.set(cards.id, this.#filmCardPresenter);
  }

  #handleFilmChange = (updateFilm) => {
    this.#cardFilms = updateItem(this.#cardFilms, updateFilm);
    this.#filmCardPresenters.get(updateFilm.id).init(updateFilm);

    if (this.#filmsPopupPresenter.popupStatus === ACTIVATE_MODE[0]) {
      this.#popupPresenterMap.get(updateFilm.id).init(updateFilm);

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
