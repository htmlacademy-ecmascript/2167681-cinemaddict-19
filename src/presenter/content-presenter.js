import {render} from '../render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';

export default class ContentPresenter {
  filmsMainContainer = new NewFilmsMainContainerView();
  mainContainersComponent = new NewMainContainersComponentView();
  cardsContainer = new NewCardsFilmContainerView ();


  constructor({filmContainer}) {
    this.filmContainer = filmContainer;
  }

  init() {
    render(this.filmsMainContainer, this.filmContainer);
    render(this.mainContainersComponent, this.filmsMainContainer.getElement());
    render(this.cardsContainer, this.mainContainersComponent.getElement());

    for ( let i = 0; i < 5; i++ ) {
      render(new NewCardFilmView, this.cardsContainer.getElement());
    }

    render(new NewShowMoreButtonView, this.mainContainersComponent.getElement());
  }
}


export {
  ContentPresenter,
};
