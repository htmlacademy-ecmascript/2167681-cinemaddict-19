import NewPopuppView from '../view/popupp-view.js';
import {remove, render, replace} from '../framework/render.js';


export default class FilmsPopupPresenter {
  #popupFilmComponent = null;
  #mainBody = null;
  #onChangeWatchlist = null;
  #onChangeFavorite = null;
  #onChangeAlredyWatched = null;
  #filmsCommentsModel = null;
  #onDeleteComment = null;
  #onAddComment = null;
  isOpen = false;

  constructor({mainBody, changeWatchlist, changeFavorite, changeAlredyWatched,
    filmsCommentsModel, deleteComment, addComment}) {
    this.#mainBody = mainBody;
    this.#onChangeWatchlist = changeWatchlist;
    this.#onChangeFavorite = changeFavorite;
    this.#onChangeAlredyWatched = changeAlredyWatched;
    this.#filmsCommentsModel = filmsCommentsModel;
    this.#onDeleteComment = deleteComment;
    this.#onAddComment = addComment;

  }

  init(card) {

    const prevPopupFilmComponent = this.#popupFilmComponent;


    this.#popupFilmComponent = new NewPopuppView({
      card,
      onBtnClick: () => {
        this.#onClickClosedPopupDetails();
      },
      changeWatchlist: this.#onChangeWatchlist,
      changeFavorite: this.#onChangeFavorite,
      changeAlredyWatched: this.#onChangeAlredyWatched,
      filmsCommentsModel: this.#filmsCommentsModel,
      deleteComment: this.#onDeleteComment,
      addComment: this.#onAddComment

    });

    if (prevPopupFilmComponent === null) {
      this.isOpen = true;
      render(this.#popupFilmComponent, this.#mainBody);
      this.#mainBody.classList.add('hide-overflow');
      document.addEventListener('keydown', this.onEscKeyClosed );
      return;
    }
    this.isOpen = true;
    if (this.#mainBody.contains(prevPopupFilmComponent.element)) {
      replace( this.#popupFilmComponent, prevPopupFilmComponent);
      this.#popupFilmComponent.saveScroll(card.scrollPosition);
    }

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
    this.isOpen = false;
  }


  #onClickClosedPopupDetails = () => {
    if (this.#popupFilmComponent) {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(this.#popupFilmComponent.element);
      document.removeEventListener('keydown', this.onEscKeyClosed);
      this.isOpen = false;
    }

  };

  setSaving() {

    if (!this.isOpen) {
      return;
    }
    this.#popupFilmComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }


  setDeleting (id) {
    if(!this.isOpen) {
      return;
    }
    this.#popupFilmComponent.updateElement({
      isDisablet: true,
      isDeleting: true,
      deletingId: id
    });
  }

  setAborting(idToError) {
    if(!this.isOpen) {
      return;
    }
    const resetFormState = () => {
      this.#popupFilmComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#popupFilmComponent.targetShake(idToError, resetFormState);

  }

}
