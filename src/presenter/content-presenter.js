import {render, RenderPosition, remove} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';
import FilmsCardPresenter from './films-card-presenter.js';
import FilmsPopupPresenter from './films-popup-presenter.js';

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
  #loadMoreButtonComponent = null;
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;
  #filmCardPresenter = null;
  #filmsPopupPresenter = null;
  #filmCardPresenters = new Map();

  constructor({filmContainer, filmInfoModel, mainBody,}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#renderMainContainer();


  }


  #connectFilmsPopupPresenter = (card) => {

    this.#filmsPopupPresenter = new FilmsPopupPresenter({
      mainBody: this.#mainBody
    });
    this.#filmsPopupPresenter.init(card);
  };

  #connectFilmCardsPresenter() {
    this.#filmCardPresenter = new FilmsCardPresenter({
      cardsContainer: this.#cardsContainer.element,
      mainContainersComponent: this.#mainContainersComponent.element,
      mainBody: this.#mainBody,
      loadMoreButtonClickHandler: this.#loadMoreButtonClickHandler,
      popUpPresenter:  this.#connectFilmsPopupPresenter,
      handleFilmChange: this.#handleFilmChange
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
    //this.#filmCardPresenters.get(updateFilm.id).init(updateFilm);
    //console.log(this.#filmCardPresenters.get(updateFilm.id));
  };

}
