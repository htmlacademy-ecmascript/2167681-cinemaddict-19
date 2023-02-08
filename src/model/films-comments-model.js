import Observable from '../framework/observable.js';
import { adaptToUser } from '../utils/common.js';

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

  async addComment(updateType, update) {
    try {
      const {comments, movie} = await this.#commentsApiService.addComment(comment, film);

      this.#comments = comments;
      const adaptedFilm = adaptToUser(movie);
      const update = {
        film: adaptedFilm,
        scroll: scroll,
      };

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }

  }


  async deleteComment (updateType, update) {
    const index = this.#comments.findeIndex((comment) => comment.id === update);
    if (index === -1) {
      throw new Error('Unknow comment');
    }
    try {
      await this.#commentsApiService.deleteComment(update.id);
      this.#comments = this.#comments.filter((comment) => comment.id !== update.id);
      update.film.comments = this.#comments.map(({id}) => id);

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete this comment');
    }

  }
}
