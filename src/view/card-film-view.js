import { humanizeTaskDueDate, changeToHoursMinutes, checkDescriptionLength } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {FILMS_BUTTON_TYPE, DATE_FORMATS, NUMBER_TO_COMPARE} from '../const.js';


// карточка с фильмом
const createNewCardFilmTemplate = (state) => {
  const {comments, filmInfo, userDetails} = state;
  const durationTime = humanizeTaskDueDate(changeToHoursMinutes(filmInfo.duration), filmInfo.duration < NUMBER_TO_COMPARE ? DATE_FORMATS.DURATION_M : DATE_FORMATS.DURATION_H_M);
  const vDate = humanizeTaskDueDate(filmInfo.date);
  return(
    `<article class="film-card">
	<a class="film-card__link">
	  <h3 class="film-card__title"> ${filmInfo.title} </h3>
	  <p class="film-card__rating">${filmInfo.totalRating}</p>
	  <p class="film-card__info">
		 <span class="film-card__year">${vDate}</span>
		 <span class="film-card__duration">${durationTime}</span>
		 <span class="film-card__genre">${filmInfo.genre[0]}</span>
	  </p>
	  <img src="${filmInfo.poster}" alt="" class="film-card__poster">
	  <p class="film-card__description">${checkDescriptionLength(filmInfo.description)}</p>
	  <span class="film-card__comments">${comments.length} comments</span>
	</a>
	<div class="film-card__controls">
	  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button" data-button-type="${FILMS_BUTTON_TYPE.WATCHLIST}"></button>
	  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button" data-button-type="${FILMS_BUTTON_TYPE.ALREADY_WATCHED}">Mark as watched</button>
	  <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button" data-button-type="${FILMS_BUTTON_TYPE.FAVORITE}">Mark as favorite</button>
	</div>
 </article>`
  );

};

export default class NewCardFilmView extends AbstractStatefulView {
  #card = null;
  #openPopup = null;
  #onChangeWatchlist = null;
  #onChangeFavorite = null;
  #onChangeAlreadyWatched = null;


  constructor({card, onClick, changeWatchlist, changeFavorite, changeAlredyWatched}) {
    super();
    this.#card = card;
    this.#openPopup = onClick;

    this._setState(card);


    //ФУНКЦИИ ИЗМЕНЕНИЯ ДАННЫХ ПО КЛИКУ
    this.#onChangeWatchlist = changeWatchlist;
    this.#onChangeFavorite = changeFavorite;
    this.#onChangeAlreadyWatched = changeAlredyWatched;

    this.element.querySelector('.film-card__controls').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-card__controls-item')) {
        this.#changeDataClickHandler(evt);
      }
    });

    this.element.querySelector('img').addEventListener('click', this.#openPopupHandler);
  }


  get template() {
    return createNewCardFilmTemplate(this._state);
  }

  #openPopupHandler = (evt) => {
    evt.preventDefault();
    this.#openPopup();
  };

  //ФУНКЦИИ ИЗМЕНЕНИЯ ДАННЫХ ПО КЛИКУ
  #changeDataClickHandler = (evt) => {
    evt.preventDefault();
    switch (evt.target.dataset.buttonType) {
      case FILMS_BUTTON_TYPE.ALREADY_WATCHED :
        this.#onChangeAlreadyWatched(this._state);
        break;
      case FILMS_BUTTON_TYPE.FAVORITE :
        this.#onChangeFavorite(this._state);
        break;
      case FILMS_BUTTON_TYPE.WATCHLIST :
        this.#onChangeWatchlist(this._state);
        break;
    }
  };

}
