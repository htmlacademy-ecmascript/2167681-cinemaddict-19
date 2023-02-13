import he from 'he';
import { humanizeTaskDueDate, changeToHoursMinutes } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {FILMS_BUTTON_TYPE, START_VALUE, Emotion, DATE_FORMATS, FormsTextArea} from '../const.js';

const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_CLASS_NAME = 'shake';


// отрисовка выбранной эмоции
const createEmotionTemplate = (emotion) =>
  `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`;


// отрисовка комментариев
const createCommentTempalte = (comments, isDisabled, isDeleting, currentDataset) => comments.map((one) =>{
  const { author, comment, date, emotion, id} = one;

  const commentDate = humanizeTaskDueDate(date, DATE_FORMATS.COMMENT);
  return `<li class="film-details__comment" id="С${id}">
	<span class="film-details__comment-emoji">
	  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
	</span>
	<div>
	  <p class="film-details__comment-text">${comment}</p>
	  <p class="film-details__comment-info">
		 <span class="film-details__comment-author">${author}</span>
		 <span class="film-details__comment-day">${commentDate}</span>
		 <button class="film-details__comment-delete" id="С${id}" data-id-type = "${id}" ${isDisabled ? 'disabled' : ''} >${currentDataset === id && isDeleting ? 'Deleting...' : 'Delete'}</button>
	  </p>
	</div>
 </li>`;

}).join('');

// попапп с подроным описанием фильма
const createNewPopuppTemplate = (state) => {
  const { filmInfo, userDetails, comments, emotion, comment, isDisabled, isDeleting, isSaving,
    currentDataset} = state;
  const durationTime = humanizeTaskDueDate(changeToHoursMinutes(filmInfo.duration), DATE_FORMATS.DURATION_H_M);
  const releaseDate = humanizeTaskDueDate(filmInfo.release.date, DATE_FORMATS.RELEASE);


  const commentRender = createCommentTempalte(comments, isDisabled, isDeleting, currentDataset);
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
				<td class="film-details__term">${filmInfo.genre.length <= 1 ? 'Genre' : 'Genres'}</td>
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
		<button type="button" class="film-details__control-button ${userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist" data-details-button-type=${FILMS_BUTTON_TYPE.WATCHLIST} ${isDisabled ? 'disabled' : ''}>${currentDataset === FILMS_BUTTON_TYPE.WATCHLIST && isSaving ? 'Saving...' : 'Add to watchlist'}</button>
		<button type="button" class="film-details__control-button ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched" data-details-button-type=${FILMS_BUTTON_TYPE.ALREADY_WATCHED}>${currentDataset === FILMS_BUTTON_TYPE.ALREADY_WATCHED && isSaving ? 'Saving...' : 'Already watched'}</button>
		<button type="button" class="film-details__control-button ${userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite" data-details-button-type=${FILMS_BUTTON_TYPE.FAVORITE}>${currentDataset === FILMS_BUTTON_TYPE.FAVORITE && isSaving ? 'Saving...' : 'Add to favorites'}</button>
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
			 <textarea class="film-details__comment-input" id="text_text" placeholder="Select reaction below and write comment here" name="comment" data-textarea = "${FormsTextArea.COMMENT_FILM}" ${ isDisabled ? 'disabled' : ''}>${currentDataset === FormsTextArea.COMMENT_FILM && isSaving ? 'Saving...' : he.encode(comment)}</textarea>
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
  #onChangeWatchlist = null;
  #onChangeFavorite = null;
  #onChangeAlredyWatched = null;
  #deleteComment = null;
  #addComment = null;


  constructor ({card, onBtnClick, changeWatchlist, changeFavorite, changeAlredyWatched, filmsCommentsModel,
    deleteComment, addComment}) {
    super();
    this._setState(NewPopuppView.parseCardToState(card, filmsCommentsModel.comments, this._state));
    this.#btnClosedClick = onBtnClick;
    this.#onChangeWatchlist = changeWatchlist;
    this.#onChangeFavorite = changeFavorite;
    this.#onChangeAlredyWatched = changeAlredyWatched;
    this.#deleteComment = deleteComment;
    this._restoreHandlers();
    this.#addComment = addComment;


  }

  // парс из модельки
  static parseCardToState (card, comments, state) {
    return { ...card,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
      currentDataset: '',
      emotion: state?.emotion ?? 0,
      scrollPosition: state?.scrollPosition ?? 0,
      comment: '',
      comments: comments,
      idToError: state?.idToError ?? 0
    };
  }


  // парс в модельку
  static parseStateToCard (state) {
    const card = {...state,
      comments: state.comments.map((comment) => comment.id)
    };

    delete card.emotion;
    delete card.scrollPosition;
    delete card.comment;
    delete card.isDisabled;
    delete card.isDeleting;
    delete card.isSaving;
    delete card.currentDataset;
    delete card.idToError;

    return card;
  }

  static parseToComments (state) {
    const comments = state.comments;

    return comments;
  }


  get template() {
    return createNewPopuppTemplate(this._state);
  }

  // закрыть попап
  #btnClosedClickHandler = (evt) => {
    evt.preventDefault();
    this.#btnClosedClick();

  };


  // сохранение скрола
  saveScroll (scroll) {
    if (scroll) {
      this.updateElement({...this._state, scrollPosition: scroll});
    }
    this.element.scrollTo(START_VALUE, this._state.scrollPosition);
  }

  // выбор эмоции
  emotionChangeHandler = (evt) => {
    if (evt.target.matches('input')) {
      this.updateElement({...this._state, emotion: evt.target.value});
      this.saveScroll();
    }
  };

  // обработчики событий
  _restoreHandlers() {
    this.element.querySelector('.film-details__new-comment').addEventListener('click', this.emotionChangeHandler);

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#btnClosedClickHandler);

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-details__control-button')) {
        this.#changeDataClickHandler(evt);
      }
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#addCommentHandler);
    this.element.addEventListener('scroll', () => {
      this._setState({scrollPosition: this.element.scrollTop});
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('change', this.#saveComment);
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteCommentHandler);
  }

  //сохранение не отправленного комментария
  #saveComment = (evt) => {
    if (evt.target.matches('textarea')) {
      this._setState({comment: evt.target.value});
    }
    this.saveScroll();
  };

  // добавление комментария
  #addCommentHandler = (evt) => {
    const textarea = document.querySelector('.film-details__comment-input');
    if(evt.ctrlKey && evt.keyCode === 13 || evt.commandKey && evt.keyCode === 13) {
      evt.preventDefault();
      this.updateElement({...this._state, currentDataset: evt.target.dataset.textarea});
      this.#addComment({
        comment: textarea.value,
        emotion: this._state.emotion,
        film: NewPopuppView.parseStateToCard(this._state),
        idToError: evt.target.id,
        scroll: this._state.scrollPosition

      });
    }

  };

  // "покачивание" выборочно
  targetShake (id, callback) {
    this.element.querySelector(`#${id}`).classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.querySelector(`#${id}`).classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  // Удаление комментария
  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this.updateElement({...this._state, currentDataset: evt.target.dataset.idType});
    this.#deleteComment({
      id:evt.target.dataset.idType,
      film: NewPopuppView.parseStateToCard(this._state),
      idToError: evt.target.id,
      scroll: this._state.scrollPosition
    });
  };

  //Изменение данный для фильтров
  #changeDataClickHandler = (evt) => {
    evt.preventDefault();
    switch (evt.target.dataset.detailsButtonType) {
      case FILMS_BUTTON_TYPE.ALREADY_WATCHED :
        this.updateElement({...this._state, currentDataset: evt.target.dataset.detailsButtonType});
        this.#onChangeAlredyWatched({...NewPopuppView.parseStateToCard(this._state),
          idToError: evt.target.id,
          scroll: this._state.scrollPosition});
        break;
      case FILMS_BUTTON_TYPE.FAVORITE :
        this.updateElement({...this._state, currentDataset: evt.target.dataset.detailsButtonType});
        this.#onChangeFavorite({...NewPopuppView.parseStateToCard(this._state),
          idToError: evt.target.id,
          scroll: this._state.scrollPosition});
        break;
      case FILMS_BUTTON_TYPE.WATCHLIST :
        this.updateElement({...this._state, currentDataset: evt.target.dataset.detailsButtonType});
        this.#onChangeWatchlist({...NewPopuppView.parseStateToCard(this._state),
          idToError: evt.target.id,
          scroll: this._state.scrollPosition});
        break;
    }
  };

}
