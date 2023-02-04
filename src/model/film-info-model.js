import {createFilmInfo} from '../mock/render-mocks.js';
import Observable from '../framework/observable.js';

const FILM_MINI_CARDS_COUNT = 24;


export default class FilmInfoModel extends Observable {
  #cards = Array.from({length: FILM_MINI_CARDS_COUNT}, createFilmInfo);

  getCards() {

    return this.#cards;
  }


  updateFilm(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1)
    ];

    this._notify(updateType, update);

  }


}

