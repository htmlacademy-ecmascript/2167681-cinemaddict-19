import NewPopuppView from '../view/popupp-details-view.js';
import {remove, render, replace} from '../framework/render.js';
import {ACTIVATE_MODE} from '../const.js';


export default class FilmsPopupPresenter {
  #popupFilmComponent = null;
  #mainContainersComponent = null;
  #mainBody = null;
  #cardModel = null;
  #changeWatchlist = null;
  #changeFavorite = null;
  #changeAlredyWatched = null;
  popupStatus = ACTIVATE_MODE[1];
  #changeCommentsList = null;

  constructor({mainBody, changeWatchlist, changeFavorite, changeAlredyWatched, changeCommentsList}) {
    this.#mainBody = mainBody;
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlredyWatched = changeAlredyWatched;
    this.#changeCommentsList = changeCommentsList;


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
      changeCommentsList: this.#changeCommentsList

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
    this.popupStatus = ACTIVATE_MODE[1];
  }


  #onClickClosedPopupDetails = () => {
    if (this.#popupFilmComponent) {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(this.#popupFilmComponent.element);
      document.removeEventListener('keydown', this.onEscKeyClosed);
      this.popupStatus = ACTIVATE_MODE[1];
    }

  };


}
