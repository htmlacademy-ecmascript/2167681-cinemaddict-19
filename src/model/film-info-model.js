import {createFilmInfo} from '../mock/render-mocks.js';

const FILM_MINI_CARDS_COUNT = 5;


export default class FilmInfoModel {
  cards = Array.from({length: FILM_MINI_CARDS_COUNT}, createFilmInfo);

  getCards() {
    return this.cards;
  }
}
