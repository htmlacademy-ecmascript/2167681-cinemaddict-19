import {render} from '../render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewPopuppView from '../view/popupp-details-view.js';

export default class ContentPresenter {
  #filmsMainContainer = new NewFilmsMainContainerView();
  #mainContainersComponent = new NewMainContainersComponentView();
  #cardsContainer = new NewCardsFilmContainerView();
  #filmContainer;
  #filmInfoModel;
  #mainBody;
  #cardFilms;

  constructor({filmContainer, filmInfoModel, mainBody,}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [...this.#filmInfoModel.cards];
    this.#renderMainContainer();

  }


  //отрисовка главного контайнера
  #renderMainContainer() {
    const firtsFiveCard = this.#cardFilms.splice(0,5);

    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);

    if (firtsFiveCard.length === 0) {
      this.#mainContainersComponent.element.querySelector('.films-list__title').textContent = 'There are no movies in our database';
      this.#mainContainersComponent.element.querySelector('.films-list__title').classList.remove('visually-hidden');
    } else {
      for ( let i = 0; i < firtsFiveCard.length; i++ ) {
        this.#renderCards(firtsFiveCard[i]);
      }
    }

    this.#showMoreButton(this.#cardFilms);

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

  #showMoreButton(restCards) {
    const cards = restCards;
    const loadButton = new NewShowMoreButtonView();
    render(loadButton, this.#mainContainersComponent.element);
    // функция отрисовки карточек для кнопи 'show more'
    const renderRestCard = (arrayFilms) => {
      const jopa = arrayFilms.splice(0, 5);

      for(let i = 0; i < jopa.length; i++) {
        this.#renderCards(jopa[i]);
        if (arrayFilms.length === 0) {
          this.#mainContainersComponent.element.querySelector('.films-list__show-more')
            .classList.add('visually-hidden');
        }
      }
    };

    //обработчик событий на 'show more'
    this.#mainContainersComponent.element.querySelector('.films-list__show-more').addEventListener('click', () => {
      renderRestCard(cards);
    });
  }
}


export {
  ContentPresenter,
};
