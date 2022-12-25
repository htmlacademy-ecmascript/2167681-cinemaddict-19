import AbstractView from '../framework/view/abstract-view.js';
// кнопка 'показать еще'
const createNewShowMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';


export default class NewShowMoreButtonView extends AbstractView {
  #clickShowMore;

  constructor ({onBtnClick}) {
    super();
    this.#clickShowMore = onBtnClick;

    this.element.addEventListener('click', this.#showMoreClickHendler);
  }

  get template() {
    return createNewShowMoreButtonTemplate;
  }


  #showMoreClickHendler = (evt) => {
    evt.preventDefault();
    this.#clickShowMore();
  };
}
