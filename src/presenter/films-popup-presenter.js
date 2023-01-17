import NewPopuppView from '../view/popupp-details-view.js';
import {render} from '../framework/render.js';

export default class FilmsPopupPresenter {
  #popupFilmComponent = null;
  #mainContainersComponent = null;
  #mainBody = null;
  #cardModel = null;

  constructor({mainBody}) {
    this.#mainBody = mainBody;

  }

  init(card) {


    this.#popupFilmComponent = new NewPopuppView({
      card,
      onBtnClick: () => {
        this.#onClickClosedPopupDetails();
      },
    });
    render(this.#popupFilmComponent, this.#mainBody);
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


  #onClickClosedPopupDetails () {
    this.#mainBody.classList.remove('hide-overflow');
    this.#mainBody.removeChild(this.#popupFilmComponent.element);
    document.removeEventListener('keydown', this.onEscKeyClosed);
  }


}
