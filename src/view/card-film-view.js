import { humanizeTaskDueDate } from '../utils/common.js';
import AbstractView from '../framework/view/abstract-view.js';
import {activateButton} from '../utils/common.js';
import { FILMS_BUTTON_TYPE } from '../const.js';


// карточка с фильмом
const createNewCardFilmTemplate = (card) => {
  const { comments, filmInfo, userDetails} = card;
  const vDate = humanizeTaskDueDate(filmInfo.date);
  return(
    `<article class="film-card">
	<a class="film-card__link">
	  <h3 class="film-card__title"> ${filmInfo.title} </h3>
	  <p class="film-card__rating">${filmInfo.totalRating}</p>
	  <p class="film-card__info">
		 <span class="film-card__year">${vDate}</span>
		 <span class="film-card__duration">${filmInfo.duration}</span>
		 <span class="film-card__genre">${filmInfo.genre}</span>
	  </p>
	  <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
	  <p class="film-card__description">${filmInfo.description}</p>
	  <span class="film-card__comments">${comments.length} comments</span>
	</a>
	<div class="film-card__controls">
	  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--${activateButton(userDetails.watchlist)}" type="button" data-button-type=${FILMS_BUTTON_TYPE.watchlist}>Add to watchlist</button>
	  <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--${activateButton(userDetails.alreadyWatched)}" type="button" data-button-type=${FILMS_BUTTON_TYPE.alreadyWatched}>Mark as watched</button>
	  <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--${activateButton(userDetails.favorite)}" type="button" data-button-type=${FILMS_BUTTON_TYPE.favorite}>Mark as favorite</button>
	</div>
 </article>`
  );

};

export default class NewCardFilmView extends AbstractView {
  #card = null;
  #openPopup = null;
  #changeWatchlist = null;
  #changeFavorite = null;
  #changeAlreadyWatched = null;


  constructor({card, onClick, changeWatchlist, changeFavorite, changeAlredyWatched,}) {
    super();
    this.#card = card;
    this.#openPopup = onClick;

    //ФУНКЦИИ ИЗМЕНЕНИЯ ДАННЫХ ПО КЛИКУ
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlreadyWatched = changeAlredyWatched;

    this.element.querySelector('.film-card__controls').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-card__controls-item')) {
        this.#changeDataClickHendler(evt);
      }
    });

    this.element.querySelector('img').addEventListener('click', this.#openPopupHendler);
  }


  get template() {
    return createNewCardFilmTemplate(this.#card);
  }

  #openPopupHendler = (evt) => {
    evt.preventDefault();
    this.#openPopup();
  };


  #changeDataClickHendler = (evt) => {
    evt.preventDefault();
    switch (evt.target.dataset.buttonType) {
      case FILMS_BUTTON_TYPE.alreadyWatched :
        this.#changeAlreadyWatched(this.#card);
        break;
      case FILMS_BUTTON_TYPE.favorite :
        this.#changeFavorite(this.#card);
        break;
      case FILMS_BUTTON_TYPE.watchlist :
        this.#changeWatchlist(this.#card);
        break;
    }
  };

}
