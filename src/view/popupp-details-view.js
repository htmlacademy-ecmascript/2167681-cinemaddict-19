import { humanizeTaskDueDate } from '../util.js';
import AbstractView from '../framework/view/abstract-view.js';

// попапп с подроным описанием фильма
const createNewPopuppTemplate = (card) => {
  const { filmInfo, userDetails} = card;
  const vDate = humanizeTaskDueDate(filmInfo.release.date);
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
				<td class="film-details__cell">${vDate}</td>
			 </tr>
			 <tr class="film-details__row">
				<td class="film-details__term">Duration</td>
				<td class="film-details__cell">${filmInfo.duration}</td>
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
		<button type="button" class="film-details__control-button film-details__control-button${userDetails.watchlist} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
		<button type="button" class="film-details__control-button film-details__control-button${userDetails.alreadyWatched}" id="watched" name="watched">Already watched</button>
		<button type="button" class="film-details__control-button film-details__control-button${userDetails.favorite}" id="favorite" name="favorite">Add to favorites</button>
	 </section>
  </div>

  <div class="film-details__bottom-container">
	 <section class="film-details__comments-wrap">
		<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

		<ul class="film-details__comments-list"></ul>

		<form class="film-details__new-comment" action="" method="get">
		  <div class="film-details__add-emoji-label">
			 <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
		  </div>

		  <label class="film-details__comment-label">
			 <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
		  </label>

		  <div class="film-details__emoji-list">
			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked="">
			 <label class="film-details__emoji-label" for="emoji-smile">
				<img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
			 <label class="film-details__emoji-label" for="emoji-sleeping">
				<img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
			 <label class="film-details__emoji-label" for="emoji-puke">
				<img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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
export default class NewPopuppView extends AbstractView {
  #card = null;
  #btnClosedClick = null;

  constructor ({card, onBtnClick}) {
    super();
    this.#card = card;
    this.#btnClosedClick = onBtnClick;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#btnClosedClickHendler);
  }

  get template() {
    return createNewPopuppTemplate(this.#card);
  }

  #btnClosedClickHendler = (evt) => {
    evt.preventDefault();
    this.#btnClosedClick();
  };
}
