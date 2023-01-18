import NewCardFilmView from '../view/card-film-view.js';
//import NewPopuppView from '../view/popupp-details-view.js';
import {remove, render, replace} from '../framework/render.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';

export default class FilmsCardPresenter {
  #cardsContainer = null;
  #mainContainersComponent = null;
  #cardFilmComponent = null;
  #popupFilmComponent = null;
  #cardsModels = null;
  #mainBody = null;
  #loadMoreButtonComponent = null;
  #loadMoreButtonClickHandler = null;
  #renderPopup = null;
  #onFilmChange = null;

  constructor ({cardsContainer, mainContainersComponent, mainBody, loadMoreButtonClickHandler, popUpPresenter,
    handleFilmChange}) {
    this.#cardsContainer = cardsContainer;
    this.#mainContainersComponent = mainContainersComponent;
    this.#mainBody = mainBody;
    this.#loadMoreButtonClickHandler = loadMoreButtonClickHandler;
    this.#renderPopup = popUpPresenter;
    this.#onFilmChange = handleFilmChange;
  }


  init(cards) {
    this.#cardsModels = cards;

    const prevCardFilmComponent = this.#cardFilmComponent;


    this.#cardFilmComponent = new NewCardFilmView({
      card: this.#cardsModels,
      onClick: () => {

        this.#renderPopup(this.#cardsModels);
      },
      changeWatchlist: this.changeWatchlist,
      changeFavorite: this.changeFavorite,
      changeAlredyWatched: this.changeAlredyWatched,

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
  }


  renderShowMoreButton() {
    this.#loadMoreButtonComponent = new NewShowMoreButtonView({
      onBtnClick: this.#loadMoreButtonClickHandler
    });
    render(this.#loadMoreButtonComponent, this.#mainContainersComponent);
  }

  // ДАННАЯ ФУНКЦИЯ ИЗМЕНЯЕТ СТАТУС КНОПКИ (ОРИГИНАЛ ЭТОЙ ФУНКЦИИ НАХОДИТЬСЯ В UTILS/COMMON.JS)


  /* ФУНКЦИЯ ДЛЯ ИЗМЕНЕНИЯ ДАННЫХ В МОДЕЛЯХ - ОНА ПЕРЕДАЕТСЯ В VIEW/CARD-FILM-VIEW
  ИМПОРТИРУЕТСЯ ИЗ CONTENT-PReSENTER
  ПРОБЛЕМА КАК РАЗ ВО ВЛОЖЕННОСТИ ДАННОЙ СТРУКТУРЫ. НЕ ПОЛУЧАЕТСЯ ТОЧЕЧНО ИЗМЕНИТЬ ДАННЫЕ
  В ЭТОМ ВАРИАНТЕ УМЕНЯ ОСТАЕТСЯ ЛИШЬ КУСОК ОТ МОДЕЛЬКИ - userDetails */
  changeWatchlist = (data) => {
    this.#onFilmChange({...this.#cardsModels,userDetails:{...this.#cardsModels.userDetails, watchlist: !data}});

  };

  changeFavorite = (data) => {
    this.#onFilmChange({...this.#cardsModels,userDetails:{...this.#cardsModels.userDetails, favorite: !data}});

  };


  changeAlredyWatched = (data) => {
    this.#onFilmChange({...this.#cardsModels,userDetails:{...this.#cardsModels.userDetails, alreadyWatched: !data}});

  };


}
