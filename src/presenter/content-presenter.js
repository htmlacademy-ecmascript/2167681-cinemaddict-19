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
  constructor({filmContainer, filmInfoModel, mainBody}) {
    this.#filmContainer = filmContainer;
    this.#filmInfoModel = filmInfoModel;
    this.#mainBody = mainBody;
  }

  init() {
    this.#cardFilms = [ ...this.#filmInfoModel.cards];

    render(this.#filmsMainContainer, this.#filmContainer);
    render(this.#mainContainersComponent, this.#filmsMainContainer.element);
    render(this.#cardsContainer, this.#mainContainersComponent.element);

    for ( let i = 0; i < this.#cardFilms.length; i++ ) {
      render(new NewCardFilmView({card: this.#cardFilms[i]}), this.#cardsContainer.element);
    }
    render(new NewPopuppView({card: this.#cardFilms}), this.#mainBody);
    render(new NewShowMoreButtonView, this.#mainContainersComponent.element);
  }
}


export {
  ContentPresenter,
};
