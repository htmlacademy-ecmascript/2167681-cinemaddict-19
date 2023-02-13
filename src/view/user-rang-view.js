import AbstractView from '../framework/view/abstract-view.js';
import {filter} from '../utils/filters.js';
import { FilterType, Rangs} from '../const';

// ранг и аватар юзера
const createNewUserRangTemplate = (rang) => `<section class ="header__profile profile ${rang === null ? 'visually-hidden' : '' }"><p class="profile__rating ">${rang}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></section>`;

export default class NewUserRangView extends AbstractView {

  #filmModel = null;
  #currentRang = null;

  constructor ({filmModel}) {
    super();
    this.#filmModel = filmModel.getCards();
    const alreadyWatched = filter[FilterType.HISTORY](this.#filmModel).length;
    this.#counterWatchedFilms(alreadyWatched);
  }

  get template() {
    return createNewUserRangTemplate(this.#currentRang);
  }

  // изенение звания в зависимости от просмотренных фильмов
  #counterWatchedFilms (length) {

    switch (true) {
      case length >= 1 && length <= 10 :
        this.#currentRang = Rangs.NOVICE;
        break;
      case length > 10 && length <= 20 :
        this.#currentRang = Rangs.FAN;
        break;
      case length > 20 :
        this.#currentRang = Rangs.MOVIE_BUFF;
        break;

      default:
        this.#currentRang = null;
    }
  }

}

