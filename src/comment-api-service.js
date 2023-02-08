import ApiService from './framework/api-service.js';


export default class CommentsApiService extends ApiService {


  getComments(id) {
    return this._load({url: `comments/${id}`}).then(ApiService.parseResponse);
  }
}
