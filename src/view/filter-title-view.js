import AbstractView from '../framework/view/abstract-view.js';
// контейнер для карточек с фильмом (вкладывается в main-containers-componets-view.js )
const createFilterTitleViewTemplate = () =>
  '<h2 class="films-list__title visually-hidden"></h2>';


export default class NewFilterTitleView extends AbstractView {

  get template() {
    return createFilterTitleViewTemplate;
  }
}
