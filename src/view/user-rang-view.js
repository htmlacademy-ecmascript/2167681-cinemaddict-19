import AbstractView from '../framework/view/abstract-view.js';
import {filter} from '../utils/filters.js';
import { FilterType, Rangs} from '../const';
// ранг и аватар юзера
const createNewUserRangTemplate = (counter) => `<section class="header__profile profile"><p class="profile__rating ">${counter}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></section>`;

export default class NewUserRangView extends AbstractView {

  #filmModel = null;
  #currentRang = null;

  constructor ({filmModel}) {
    super();
    this.#filmModel = filmModel;

  }

  get template() {
    return createNewUserRangTemplate(this.#currentRang);
  }

  counterWatchedFilms () {
    const films = this.#filmModel.getCards();
    const count = filter[FilterType.HISTORY](films).length;
    switch (count) {
      case (count >= 1 && count <= 10):
        this.#currentRang = Rangs.NOVICE;
        break;
      case (count >= 11 && count <= 20):
        this.#currentRang = Rangs.FAN;
        break;
      case (count >= 21):
        this.#currentRang = Rangs.MOVIE_BUFF;
    }
  }

}

