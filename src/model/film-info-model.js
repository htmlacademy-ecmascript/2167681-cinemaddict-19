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
    const {userDetails, comments, idToError, scroll, id, filmInfo} = update;

    const film = {userDetails, comments, id, filmInfo};

    const index = this.#cards.findIndex((card) => card.id === film.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    try {
      const response = await this.#filmsApiService.updateFilms(film);
      const updatedFilm = this.#adaptToClient(response);

      const updateToUser = {...updatedFilm,
        scrollPosition: scroll,
        idToError: idToError
      };

      this.#cards = [
        ...this.#cards.slice(0, index),
        updateToUser,
        ...this.#cards.slice(index + 1)
      ];
      this._notify(updateType, updateToUser);
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


