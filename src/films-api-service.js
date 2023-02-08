/* eslint-disable camelcase */
import ApiService from './framework/api-service.js';


const Method = {
  GET: 'GET',
  PUT: 'PUT',
};


export default class FilmsApiService extends ApiService {


  get films() {
    return this._load({url: '/movies'})
      .then(ApiService.parseResponse);
  }


  getget (film) {
    const x = this.#adaptToServer(film);

    return this.updateFilms(x);

  }


  async updateFilms(movie) {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': 'aplication/js'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(films) {
    const release = {...films.filmInfo.release,
      release_country: films.filmInfo.release.releaseCountry,
      date: films.filmInfo.release.date instanceof Date ? films.filmInfo.release.date.toISOString() : null
    };

    delete release.releaseCountry;

    const film_info = {...films.filmInfo,
      age_rating: films.filmInfo.ageRating,
      total_rating: films.filmInfo.totalRating,
      alternative_title: films.filmInfo.alternativeTitle,
      release: release
    };

    delete film_info.ageRating;
    delete film_info.totalRating;
    delete film_info.alternativeTitle;

    const user_details = {...films.userDetails,
      already_watched: films.userDetails.alreadyWatched,
      watching_date: films.userDetails.watchingDate instanceof Date ? films.userDetails.watchingDate.toISOString() : null

    };
    delete user_details.alreadyWatched;
    delete user_details.watchingDate;

    const adaptedToServer = {...films,
      user_details: user_details,
      film_info: film_info
    };

    delete adaptedToServer.userDetails;
    delete adaptedToServer.filmInfo;

    return adaptedToServer;
  }
}
