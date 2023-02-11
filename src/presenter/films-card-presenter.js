import NewCardFilmView from '../view/card-film-view.js';
//import NewPopuppView from '../view/popupp-details-view.js';
import {remove, render, replace} from '../framework/render.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';


export default class FilmsCardPresenter {
  #cardsContainer = null;
  #mainContainersComponent = null;
  #cardFilmComponent = null;
  #cardsModels = null;
  #loadMoreButtonComponent = null;
  #loadMoreButtonClickHandler = null;
  #changeWatchlist = null;
  #changeFavorite = null;
  #changeAlredyWatched = null;
  #popupPresenterMap = new Map();
  #popUpPresenter = null;
  #mainBody = null;
  #filmsCommentsModel = null;

  constructor ({cardsContainer, mainContainersComponent, loadMoreButtonClickHandler, popUpPresenter,
    changeWatchlist, changeFavorite, changeAlredyWatched, mainBody, filmsCommentsModel}) {
    this.#cardsContainer = cardsContainer;
    this.#mainContainersComponent = mainContainersComponent;
    this.#loadMoreButtonClickHandler = loadMoreButtonClickHandler;
    this.#popUpPresenter = popUpPresenter;
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlredyWatched = changeAlredyWatched;
    this.#mainBody = mainBody;
    this.#filmsCommentsModel = filmsCommentsModel;

  }


  init(cards) {
    this.#cardsModels = cards;
    const prevCardFilmComponent = this.#cardFilmComponent;

    this.#cardFilmComponent = new NewCardFilmView({
      card: this.#cardsModels,
      onClick: () => {

        this.#renderPopup(this.#cardsModels);
      },
      changeWatchlist: this.#changeWatchlist,
      changeFavorite: this.#changeFavorite,
      changeAlredyWatched: this.#changeAlredyWatched,
      comments:this.#filmsCommentsModel.comments,

    });

    if (prevCardFilmComponent === null) {
      render(this.#cardFilmComponent, this.#cardsContainer);
      return;
    }

    if (this.#cardsContainer.contains(prevCardFilmComponent.element)) {
      replace(this.#cardFilmComponent, prevCardFilmComponent);
    }


    remove(prevCardFilmComponent);
  }

  destroy() {
    remove(this.#cardFilmComponent);
    remove(this.#loadMoreButtonComponent);
  }

  removeCard() {
    remove(this.#cardFilmComponent);
  }


  async #renderPopup (model) {
    await this.#filmsCommentsModel.init(model.id);
    this.#popUpPresenter(model);
  }


  renderShowMoreButton() {
    this.#loadMoreButtonComponent = new NewShowMoreButtonView({
      onBtnClick: this.#loadMoreButtonClickHandler
    });
    render(this.#loadMoreButtonComponent, this.#mainContainersComponent);
  }


}
