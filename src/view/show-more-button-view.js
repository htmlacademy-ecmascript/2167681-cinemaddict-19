import AbstractView from '../framework/view/abstract-view.js';
// кнопка 'показать еще'
const createNewShowMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';


export default class NewShowMoreButtonView extends AbstractView {

  get template() {
    return createNewShowMoreButtonTemplate;
  }
}
