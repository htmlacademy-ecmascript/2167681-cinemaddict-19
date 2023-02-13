import Observable from '../framework/observable.js';


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
    try
    {
      this.#comments = await this.#commentsApiService.getComments(id);
    } catch (err) {
      this.#comments = [];
    }
  }

  // добавление комментария
  async addComment(updateType, update) {
    const {film, emotion, comment, idToError, scroll} = update;

    const commentData = {emotion, comment};

    try {
      await this.#commentsApiService.addComment(film.id, commentData);
      await this.init(film.id);

      film.comments = this.#comments.map((iD) => iD.id);

      const updateToUser = {...film,
        comments:this.#comments.map((iD) => iD.id),
        idToError: idToError,
        scrollPosition: scroll,
      };

      this._notify(updateType, updateToUser);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }

  }

  // удаление комментария

  async deleteComment (updateType, update) {
    const { id, film, idToError, scroll} = update;
    const index = this.#comments.findIndex((comment) => comment.id === id);
    if (index === -1) {
      throw new Error('Unknow comment');
    }

    try {

      await this.#commentsApiService.deleteComment(id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];

      const updateToUser = {...film,
        comments:this.#comments.map((iD) => iD.id),
        idToError: idToError,
        scrollPosition: scroll,
      };

      this._notify(updateType, updateToUser);

    } catch (err) {
      throw new Error('Can\'t delete this comment');
    }

  }
}
