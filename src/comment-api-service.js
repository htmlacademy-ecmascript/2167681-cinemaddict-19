import ApiService from './framework/api-service.js';
import { Method } from './const.js';


export default class CommentsApiService extends ApiService {


  getComments(id) {
    return this._load({url: `comments/${id}`}).then(ApiService.parseResponse);
  }

  async addComment (id, commentData) {

    const response = await this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(commentData),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  }
}
