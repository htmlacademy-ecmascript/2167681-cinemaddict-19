import AbstractView from '../framework/view/abstract-view.js';

//главный контейнер с контентом сайта
const createNewFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class NewFilmsMainContainerView extends AbstractView {

  get template() {
    return createNewFilmsMainContainerTemplate;
  }
}
