import {render, RenderPosition} from '../render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewPopuppView from '../view/popupp-details-view.js';
import NewFilterTitleView from '../view/filter-title-view.js';

const TASK_COUNT_PER_STEP = 5;

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
  #arrayCopy = [];

  constructor({filmContainer, filmInfoModel, mainBody,}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#arrayCopy = this.#cardFilms.slice();
    this.#renderMainContainer();
  }

  //функция кнопки 'show more'
  #loadMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    const pieceOfArray = this.#arrayCopy.splice(0, TASK_COUNT_PER_STEP);

    for(let i = 0; i < pieceOfArray.length; i++) {
      this.#renderCards(pieceOfArray[i]);
    }

    if (this.#arrayCopy.length === 0) {
      this.#mainContainersComponent.element.querySelector('.films-list__show-more')
        .classList.add('visually-hidden');
    }
  };

  //отрисовка главного контайнера
  #renderMainContainer() {
    const firtsFiveCard = this.#arrayCopy.splice(0, TASK_COUNT_PER_STEP);

    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);
    render(this.#filterTitleView, this.#mainContainersComponent.element, RenderPosition.AFTERBEGIN);

    if (firtsFiveCard.length === 0) {
      this.#filterTitleView.element.textContent = 'There are no movies in our database';
      this.#mainContainersComponent.element.querySelector('.films-list__title').classList.remove('visually-hidden');
    } else {
      for ( let i = 0; i < firtsFiveCard.length; i++ ) {
        this.#renderCards(firtsFiveCard[i]);
      }
    }

    if (this.#arrayCopy.length > TASK_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new NewShowMoreButtonView();
      render(this.#loadMoreButtonComponent, this.#mainContainersComponent.element);
      this.#loadMoreButtonComponent.element.addEventListener('click', this.#loadMoreButtonClickHandler);
    }

  }

  // функция отрисовки карточек
  #renderCards(card) {
    const filmCardComponent = new NewCardFilmView({card});
    const popupComponent = new NewPopuppView({card});


    // функция открытия попапа "подробности фильма"
    const openPopupDetails = () => {
      this.#mainBody.classList.add('hide-overflow');
      render (popupComponent, this.#mainBody);
    };
    // функция закрытие попапа "подробности фильма"
    const closedPopupDetails = () => {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(popupComponent.element);
    };
    //закрытие поп аппа на ескейп
    const onEscKeyClosed = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc' ) {
        evt.preventDefault();
        closedPopupDetails();
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    };


    render(filmCardComponent, this.#cardsContainer.element);


    // обработчик открытие попапа "подробности фильма"
    filmCardComponent.element.querySelector('img').addEventListener('click', () => {
      openPopupDetails();
      document.addEventListener('keydown', onEscKeyClosed);

    });
    // обработчик закрытие попапа "подробности фильма"
    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closedPopupDetails();
      document.removeEventListener('keydown', onEscKeyClosed);
    });

  }

}


export {
  ContentPresenter,
};
