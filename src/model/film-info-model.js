import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';


export default class FilmInfoModel extends Observable {
  // #cards = Array.from({length: FILM_MINI_CARDS_COUNT}, createFilmInfo);
  #cards = [];
  #filmsApiService = null;
  #commentsApiService = null;

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
      throw new Error('Can\'t update unexisting task');
    }
    try {
      const response = this.#filmsApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#cards = [
        ...this.#cards.slice(0, index),
        updatedFilm,
        ...this.#cards.slice(index + 1)
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update task');
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


  #adaptToClient = (films) => {
    const release = {...films.film_info.release,
      date: films.film_info.release.date !== null ? new Date(films.film_info.release.date) : films.film_info.release.date,
      releaseCountry: films.film_info.release.release_country
    };

    delete release.release_country;

    const filmInfo = {...films.film_info,
      ageRating: films.film_info.age_rating,
      alternativeTitle: films.film_info.alternative_title,
      release: release,
      totalRating: films.film_info.total_rating,
    };

    delete filmInfo.age_rating;
    delete filmInfo.alternative_title;
    delete filmInfo.total_rating;

    const userDetails = {...films.user_details,
      alreadyWatched:  films.user_details.already_watched,
      watchingDate: films.user_details.watching_date !== null ? new Date(films.user_details.watching_date) : films.user_details.watching_date
    };

    delete userDetails.already_watched;
    delete userDetails.watching_date;

    const adaptFilms = {...films,
      filmInfo: filmInfo,
      userDetails: userDetails,
    };

    delete adaptFilms.user_details;
    delete adaptFilms.film_info;


    return adaptFilms;
  };

}


