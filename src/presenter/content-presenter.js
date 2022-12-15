import {render} from '../render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewFilmsMainContainerView from '../view/films-main-container-view.js';
import NewMainContainersComponentView from '../view/main-containers-component-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewCardsFilmContainerView from '../view/cards-film-container-view.js';
import NewPopuppView from '../view/popupp-details-view.js';

export default class ContentPresenter {
  filmsMainContainer = new NewFilmsMainContainerView();
  mainContainersComponent = new NewMainContainersComponentView();
  cardsContainer = new NewCardsFilmContainerView();

  constructor({filmContainer, filmInfoModel, mainBody}) {
    this.filmContainer = filmContainer;
    this.filmInfoModel = filmInfoModel;
    this.mainBody = mainBody;
  }

  init() {
    this.cardFilms = [ ...this.filmInfoModel.getCards()];

    render(this.filmsMainContainer, this.filmContainer);
    render(this.mainContainersComponent, this.filmsMainContainer.getElement());
    render(this.cardsContainer, this.mainContainersComponent.getElement());

    for ( let i = 0; i < this.cardFilms.length; i++ ) {
      render(new NewCardFilmView({card: this.cardFilms[i]}), this.cardsContainer.getElement());
    }
    render(new NewPopuppView({card: this.cardFilms}), this.mainBody);
    render(new NewShowMoreButtonView, this.mainContainersComponent.getElement());
  }
}


export {
  ContentPresenter,
};
