import AbstractView from '../framework/view/abstract-view.js';
// кнопка 'показать еще'
const createNewShowMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';


export default class NewShowMoreButtonView extends AbstractView {
  #onClickShowMore;

  constructor ({onBtnClick}) {
    super();
    this.#onClickShowMore = onBtnClick;

    this.element.addEventListener('click', this.#showMoreClickHandler);
  }

  get template() {
    return createNewShowMoreButtonTemplate;
  }


  #showMoreClickHandler = (evt) => {
    evt.preventDefault();
    this.#onClickShowMore();
  };
}
