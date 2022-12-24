import AbstractView from '../framework/view/abstract-view.js';
// компонент для показа карточек по предпочтениям
const createNewMainContainersComponentTemplate = () =>
  `<section class="films-list">
     
   </section>`;

export default class NewMainContainersComponentView extends AbstractView {
  get template() {
    return createNewMainContainersComponentTemplate;
  }
}


