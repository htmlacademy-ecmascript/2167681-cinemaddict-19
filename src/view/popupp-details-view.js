//import he from 'he';
import { humanizeTaskDueDate } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {FILMS_BUTTON_TYPE, START_VALUE, Emotion, DATE_FORMATS, COMPARE_VALUE_FOR_FILM_DURATION} from '../const.js';
import { createComment } from '../mock/render-mocks.js';

// отрисовка выбранной эмоции
const createEmotionTemplate = (emotion) =>
  `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`;


// отрисовка комментариев
const createCommentTempalte = (comments) => comments.map((one) =>{
  const { author, comment, date, emotion, id} = one;
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
		 <button class="film-details__comment-delete" data-id-type = "${id}" >Delete</button>
	  </p>
	</div>
 </li>`;

}).join('');

// попапп с подроным описанием фильма
const createNewPopuppTemplate = (state) => {
  const { filmInfo, userDetails, comments, emotion, comment, commentsArray} = state;
  const durationTime = humanizeTaskDueDate(filmInfo.duration, filmInfo.duration > COMPARE_VALUE_FOR_FILM_DURATION ? DATE_FORMATS.DURATION_H_M : DATE_FORMATS.DURATION_M);
  const releaseDate = humanizeTaskDueDate(filmInfo.release.date, DATE_FORMATS.RELEASE);


  const commentRender = createCommentTempalte(commentsArray);
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
		  <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

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
				  <span class="film-details__genre">${filmInfo.genre[0] ? filmInfo.genre[0] : ''}</span>
				  <span class="film-details__genre">${filmInfo.genre[1] ? filmInfo.genre[1] : ''}</span>
				  <span class="film-details__genre">${filmInfo.genre[2] ? filmInfo.genre[2] : ''}</span></td>
			 </tr>
		  </tbody></table>

		  <p class="film-details__film-description">
			 ${filmInfo.description}
		  </p>
		</div>
	 </div>
	 <section class="film-details__controls">
		<button type="button" class="film-details__control-button ${userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist" data-details-button-type=${FILMS_BUTTON_TYPE.WATCHLIST}>Add to watchlist</button>
		<button type="button" class="film-details__control-button ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched" data-details-button-type=${FILMS_BUTTON_TYPE.ALREADY_WATCHED}>Already watched</button>
		<button type="button" class="film-details__control-button ${userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite" data-details-button-type=${FILMS_BUTTON_TYPE.FAVORITE}>Add to favorites</button>
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
			 <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
		  </label>

		  <div class="film-details__emoji-list">
			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emotion === Emotion.SMILE ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-smile">
				<img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emotion === Emotion.SLEEPING ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-sleeping">
				<img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emotion === Emotion.PUKE ? 'checked' : ''}>
			 <label class="film-details__emoji-label" for="emoji-puke">
				<img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
			 </label>

			 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emotion === Emotion.ANGRY ? 'checked' : ''}>
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
  #changeCommentsList = null;
  #deleteComment = null;
  #comments = [];
  #wwww;


  constructor ({card, onBtnClick, changeWatchlist, changeFavorite, changeAlredyWatched, changeCommentsList, filmsCommentsModel,
    deleteComment, hi}) {
    super();
    this._setState(NewPopuppView.parseCardToState(card, filmsCommentsModel.comments));
    this.#btnClosedClick = onBtnClick;
    this.#changeWatchlist = changeWatchlist;
    this.#changeFavorite = changeFavorite;
    this.#changeAlredyWatched = changeAlredyWatched;
    this.#changeCommentsList = changeCommentsList;
	 this.#deleteComment = deleteComment;
	 this.#wwww = hi
    this._restoreHandlers();
    this.#comments = filmsCommentsModel;

	 console.log(this._state)

  }

  // парс из модельки
  static parseCardToState (card, comments) {
    return { ...card,
      emotion:'',
      scrollPosition:'',
      comment: '',
      commentsArray: comments
    };
  }


  // парс в модельку
  static parseStateToCard (state) {
    const card = {...state};

    delete card.emotion;
    delete card.scrollPosition;
    delete card.comment;
    delete card.commentsArray;

    return card;
  }

  static parseToComments (state) {
    const comments = state.commentsArray;

    return comments;
  }


  get template() {
    return createNewPopuppTemplate(this._state);
  }

  // закрыть попап
  #btnClosedClickHendler = (evt) => {
    evt.preventDefault();
    this.#btnClosedClick();

  };


  // сохранение скрола
  saveScroll () {
    this.element.scrollTo(START_VALUE, this._state.scrollPosition);
  }

  // выбор эмоции
  emotionChangeHendler = (evt) => {
    if (evt.target.matches('input')) {
      this.updateElement({...this._state, emotion: evt.target.value});
      this.saveScroll();
    }
  };

  // обработчики событий
  _restoreHandlers() {
    this.element.querySelector('.film-details__new-comment').addEventListener('click', this.emotionChangeHendler);

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#btnClosedClickHendler);

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-details__control-button')) {
        this.#changeDataClickHendler(evt);
      }
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#addComment);
    this.element.addEventListener('scroll', () => {
      this._setState({scrollPosition: this.element.scrollTop});
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('change', this.#saveComment);
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteCommentHendler);
  }

  //сохранение не отправленного комментария
  #saveComment = (evt) => {
    if (evt.target.matches('textarea')) {
      this._setState({comment: evt.target.value});
    }
  };

  // добавление комментария
  #addComment = (evt) => {
    const emotion = this._state.emotion;
    const textarea = document.querySelector('.film-details__comment-input');

    if(evt.ctrlKey && evt.keyCode === 13) {
      this.#comments.dodo(createComment(textarea.value, emotion));
      this.updateElement(this._state.comments.push());
      this.saveScroll();
      this.#changeCommentsList(NewPopuppView.parseStateToCard(this._state));
      textarea.value = '';
      this._setState({comment: ''});
    }

  };


  // Удаление комментария
  #deleteCommentHendler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this.saveScroll();

    this.#deleteComment(evt.target.dataset.idType);
  };

  //Изменение данный для фильтров
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
