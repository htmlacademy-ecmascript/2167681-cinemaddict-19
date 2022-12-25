import {render, RenderPosition} from '../framework/render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewPopuppView from '../view/popupp-details-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmsMainContainer = new NewFilmsMainContainerView();
  #mainContainersComponent = new NewMainContainersComponentView();
  #cardsContainer = new NewCardsFilmContainerView();
  #filterTitleView = new NewFilterTitleView();
  #filmContainer;
  #filmInfoModel;
  #mainBody;
  #cardFilms;
  #loadMoreButtonComponent = null;
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;

  constructor({filmContainer, filmInfoModel, mainBody,}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;

  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#renderMainContainer();

  }

  //функция кнопки 'show more'
  #loadMoreButtonClickHandler = () => {
    this.#cardFilms
      .slice(this.#arrayFilmsCount, this.#arrayFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCards(card));

    this.#arrayFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#arrayFilmsCount >= this.#cardFilms.length) {
      this.#mainContainersComponent.element.querySelector('.films-list__show-more')
        .classList.add('visually-hidden');
    }
  };

  //отрисовка главного контайнера
  #renderMainContainer() {

    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);
    render(this.#filterTitleView, this.#mainContainersComponent.element, RenderPosition.AFTERBEGIN);

    if (this.#cardFilms.length === 0) {
      this.#filterTitleView.element.textContent = 'There are no movies in our database';
      this.#mainContainersComponent.element.querySelector('.films-list__title').classList.remove('visually-hidden');
    } else {
      for ( let i = 0; i < Math.min(this.#cardFilms.length, FILMS_COUNT_PER_STEP); i++ ) {
        this.#renderCards(this.#cardFilms[i]);
      }
    }

    if (this.#cardFilms.length > FILMS_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new NewShowMoreButtonView({
        onBtnClick: this.#loadMoreButtonClickHandler
      });
      render(this.#loadMoreButtonComponent, this.#mainContainersComponent.element);
    }

  }

  // функция отрисовки карточек
  #renderCards(card) {
    const filmCardComponent = new NewCardFilmView({card,
      onClick: () => {
        openPopupDetails.call(this);
        document.addEventListener('keydown', onEscKeyClosed);
      }
    });
    const popupComponent = new NewPopuppView({card,
      onBtnClick: () => {
        closedPopupDetailsClick.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    });


    // функция открытия попапа "подробности фильма"
    function openPopupDetails () {
      this.#mainBody.classList.add('hide-overflow');
      render (popupComponent, this.#mainBody);
    }
    // закрытие попаппа на клик
    function closedPopupDetailsClick () {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(popupComponent.element);
    }

    // функция закрытие попапа "подробности фильма" для esc (пришлось добавить так как closedPopupDetailsClick не работает в теле onEscKeyClosed)
    function closedPopupDetailsEsc () {
      this.body.classList.remove('hide-overflow');
      this.body.removeChild(popupComponent.element);
    }


    //закрытие поп аппа на ескейп
    function onEscKeyClosed (evt) {
      if(evt.key === 'Escape' || evt.key === 'Esc' ) {
        closedPopupDetailsEsc.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    }


    render(filmCardComponent, this.#cardsContainer.element);

  }

}


export {
  ContentPresenter,
};
