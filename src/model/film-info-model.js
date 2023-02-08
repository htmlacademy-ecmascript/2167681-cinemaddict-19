import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { adaptToUser } from '../utils/common.js';


export default class FilmInfoModel extends Observable {
  #cards = [];
  #filmsApiService = null;

  getCards() {
    return this.#cards;
  }

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;

  }

  async updateFilm(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    try {
      const response = await this.#filmsApiService.updateFilms(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#cards = [
        ...this.#cards.slice(0, index),
        updatedFilm,
        ...this.#cards.slice(index + 1)
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  async init () {

    try {
      const films = await this.#filmsApiService.films;
      this.#cards = films.map(this.#adaptToClient);
    } catch(err) {
      this.#cards = [];
    }

    this._notify(UpdateType.INIT);
  }


  #adaptToClient = (films) => adaptToUser(films);


}


