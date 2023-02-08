import Observable from '../framework/observable.js';
//import { UpdateType } from '../const.js';


export default class FilmsCommentsModel extends Observable {
  #comments = [];
  #commentsApiService;

  get comments() {
    return this.#comments;
  }


  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async init (id) {
    this.#comments = await this.#commentsApiService.getComments(id);
  }

}
