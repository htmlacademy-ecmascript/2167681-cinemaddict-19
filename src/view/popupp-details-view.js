import { humanizeTaskDueDate } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {activateButton} from '../utils/common.js';
import {FILMS_BUTTON_TYPE, START_VALUE, EMOTION, DATE_FORMATS, COMPARE_VALUE_FOR_FILM_DURATION} from '../const.js';


const createEmotionTemplate = (emotion) =>
  `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`;


const createCommentTempalte = (comments) => comments.map((one) =>{
  const { author, comment, date, emotion} = one;
  const commentDate = humanizeTaskDueDate(date, DATE_FORMATS.COMMENT);

  return `<li class="film-details__comment">
	<span class="film-details__comment-emoji">
	  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
	</span>
	<div>
	  <p class="film-details__comment-text">${comment}</p>
	  <p class="film-details__comment-info">
		 <span class="film-details__comment-author">${author}</span>
		 <span class="film-details__comment-day">${commentDate}</span>
		 <button class="film-details__comment-delete">Delete</button>
	  </p>
	</div>
 </li>`;

}).join('');


// попапп с подроным описанием фильма
const createNewPopuppTemplate = (state) => {
  const { filmInfo, userDetails, comments, emotion} = state;
  const durationTime = humanizeTaskDueDate(filmInfo.duration, filmInfo.duration > COMPARE_VALUE_FOR_FILM_DURATION ? DATE_FORMATS.DURATION_H_M : DATE_FORMATS.DURATION_M);
  const releaseDate = humanizeTaskDueDate(filmInfo.release.date, DATE_FORMATS.RELEASE);

  const commentRender = createCommentTempalte(comments);
  const emoChange = emotion ? createEmotionTemplate(emotion) : '';
  return(
    `<section class="film-details">
<div class="film-details__inner">
  <div class="film-details__top-container">
	 <div class="film-details__close">
		<button class="film-details__close-btn" type="button">close</button>
	 </div>
	 <div class="film-details__info-wrap">
		<div class="film-details__poster">
		  <img class="film-details__poster-img" src="./images/posters/${filmInfo.poster}" alt="">

		  <p class="film-details__age">${filmInfo.ageRating}</p>
		</div>

		<div class="film-details__info">
		  <div class="film-details__info-head">
			 <div class="film-details__title-wrap">
				<h3 class="film-details__title">${filmInfo.title}</h3>
				<p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
			 </div>

			 <div class="film-details__rating">
				<p class="film-details__total-rating">${filmInfo.totalRating}</p>
			 </div>
		  </div>

		  <table class="film-details__table">
			 <tbody><tr class="film-details__row">
				<td class="film-details__term">Director</td>
				<td class="film-details__cell">${filmInfo.director}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">writers</td>
				<td class="film-details__cell">${filmInfo.writers}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Actors</td>
				<td class="film-details__cell">${filmInfo.actors}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Release Date</td>
				<td class="film-details__cell">${releaseDate}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Duration</td>
				<td class="film-details__cell">${durationTime}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Country</td>
				<td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Genres</td>
				<td class="film-details__cell">
				  <span class="film-details__genre">${filmInfo.genre}</span>
				  <span class="film-details__genre"></span>
				  <span class="film-details__genre"></span></td>
			 </tr>
		  </tbody></table>

		  <p class="film-details__film-description">
			 ${filmInfo.description}
		  </p>
		</div>
	 </div>

	 <section class="film-details__controls">
		<button type="button" class="film-details__control-button film-details__control-button--${activateButton(userDetails.watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist" data-details-button-type=${FILMS_BUTTON_TYPE.WATCHLIST}>Add to watchlist</button>
		<button type="button" class="film-details__control-button film-details__control-button--${activateButton(userDetails.alreadyWatched)} film-details__control-button--watched" id="watched" name="watched" data-details-button-type=${FILMS_BUTTON_TYPE.ALREADY_WATCHED}>Already watched</button>
		<button type="button" class="film-details__control-button film-details__control-button--${activateButton(userDetails.favorite)} film-details__control-button--favorite" id="favorite" name="favorite" data-details-button-type=${FILMS_BUTTON_TYPE.FAVORITE}>Add to favorites</button>
	 </section>
  </div>

  <div class="film-details__bottom-container">
	 <section class="film-details__comments-wrap">
		<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

		<ul class="film-details__comments-list">
		${commentRender}
		</ul>

		<form class="film-details__new-comment" action="" method="get">
		  <div class="film-details__add-emoji-label">
	${emoChange}
		  </div>

		  <label class="film-details__comment-label">
			 <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
		  </label>

		  <div class="film-details__emoji-list">
			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emotion === EMOTION.SMILE ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-smile">
				<img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emotion === EMOTION.SLEEPING ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-sleeping">
				<img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emotion === EMOTION.PUKE ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-puke">
				<img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emotion === EMOTION.ANGRY ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-angry">
				<img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
			 </label>
		  </div>
		</form>
	 </section>
  </div>
</div>
</section>`
  );
};
export default class NewPopuppView extends AbstractStatefulView {
  #btnClosedClick = null;
  #changeWatchlist = null;
  #changeFavorite = null;
  #changeAlredyWatched = null;

  constructor ({card, onBtnClick, changeWatchlist, changeFavorite, changeAlredyWatched}) {
    super();
    this._setState(NewPopuppView.parseCardToState(card));
    this.#btnClosedClick = onBtnClick;
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlredyWatched = changeAlredyWatched;

    this._restoreHandlers();


  }

  static parseCardToState (card) {
    return { ...card,
      emotion:'',
      scrollPosition:''
    };
  }

  static parseStateToCard (state) {
    const card = {...state};

    delete card.emotion;
    delete card.scrollPosition;

    return card;
  }

  get template() {
    return createNewPopuppTemplate(this._state);
  }

  #btnClosedClickHendler = (evt) => {
    evt.preventDefault();
    this.#btnClosedClick();

  };

  saveScroll () {
    this.element.scrollTo(START_VALUE, this._state.scrollPosition);
  }

  emotionChangeHendler = (evt) => {
    if (evt.target.matches('input')) {
      this.updateElement({...this._state, emotion: evt.target.value});
      this.saveScroll();
    }
  };


  _restoreHandlers() {
    this.element.querySelector('.film-details__new-comment').addEventListener('click', this.emotionChangeHendler);

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#btnClosedClickHendler);

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-details__control-button')) {
        this.#changeDataClickHendler(evt);
      }
    });

    this.element.addEventListener('scroll', () => {
      this._setState({scrollPosition: this.element.scrollTop});
    });
  }


  #changeDataClickHendler = (evt) => {
    evt.preventDefault();
    switch (evt.target.dataset.detailsButtonType) {
      case FILMS_BUTTON_TYPE.ALREADY_WATCHED :
        this.#changeAlredyWatched(NewPopuppView.parseStateToCard(this._state));
        break;
      case FILMS_BUTTON_TYPE.FAVORITE :
        this.#changeFavorite(NewPopuppView.parseStateToCard(this._state));
        break;
      case FILMS_BUTTON_TYPE.WATCHLIST :
        this.#changeWatchlist(NewPopuppView.parseStateToCard(this._state));
        break;
    }
  };

}
