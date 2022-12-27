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
  #mainBody = null;
  #cardFilms;
  #loadMoreButtonComponent = null;
  #arrayFilmsCount = FILMS_COUNT_PER_STEP;
  #filmCardComponent;
  #popupComponent;

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
    this.#filmCardComponent = new NewCardFilmView({card,
      onClick: () => {
        this.#renderPopup(card);
      }
    });

    render(this.#filmCardComponent, this.#cardsContainer.element);

  }

  // функция отрисовки попапа
  #renderPopup(card) {
    this.#popupComponent = new NewPopuppView({card,
      onBtnClick: () => {
        this.#closedPopupDetailsClick();
      }
    });
    render(this.#popupComponent, this.#mainBody);
    this.#mainBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyClosed);

  }
  //закрытие поп аппа на ескейп

  #onEscKeyClosed (evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc' ) {
      evt.preventDefault();
      this.#closedPopupDetailsClick();
      document.removeEventListener('keydown', this.#onEscKeyClosed);
    }
  }


  #closedPopupDetailsClick () {
    this.#mainBody.classList.remove('hide-overflow');
    this.#mainBody.removeChild(this.#popupComponent.element);
  }
}


export {
  ContentPresenter,
};
