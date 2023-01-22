import NewPopuppView from '../view/popupp-details-view.js';
import {remove, render, replace} from '../framework/render.js';

export default class FilmsPopupPresenter {
  #popupFilmComponent = null;
  #mainContainersComponent = null;
  #mainBody = null;
  #cardModel = null;
  #changeWatchlist = null;
  #changeFavorite = null;
  #changeAlredyWatched = null;

  constructor({mainBody, changeWatchlist, changeFavorite, changeAlredyWatched}) {
    this.#mainBody = mainBody;
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlredyWatched = changeAlredyWatched;


  }

  init(card) {

    const prevPopupFilmComponent = this.#popupFilmComponent;


    this.#popupFilmComponent = new NewPopuppView({
      card,
      onBtnClick: () => {
        this.#onClickClosedPopupDetails();
      },
      changeWatchlist: this.#changeWatchlist,
      changeFavorite: this.#changeFavorite,
      changeAlredyWatched: this.#changeAlredyWatched,

    });


    if (prevPopupFilmComponent === null) {
      render(this.#popupFilmComponent, this.#mainBody);
      this.#mainBody.classList.add('hide-overflow');
      document.addEventListener('keydown', this.onEscKeyClosed );
      return;
    }

    if (this.#mainBody.contains(prevPopupFilmComponent.element)) {
      replace( this.#popupFilmComponent, prevPopupFilmComponent);
    }

    remove(prevPopupFilmComponent);

    this.#mainBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.onEscKeyClosed );
  }

  //закрытие поп аппа на ескейп

  onEscKeyClosed = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc' ) {

      evt.preventDefault();
      this.#onClickClosedPopupDetails();
      document.removeEventListener('keydown', this.onEscKeyClosed);
    }
  };

  destroy (){
    remove(this.#popupFilmComponent);
    document.removeEventListener('keydown', this.onEscKeyClosed);
  }


  #onClickClosedPopupDetails = () => {
    if (this.#popupFilmComponent){
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(this.#popupFilmComponent.element);
      document.removeEventListener('keydown', this.onEscKeyClosed);
    }
    remove(this.#popupFilmComponent);

  };


}