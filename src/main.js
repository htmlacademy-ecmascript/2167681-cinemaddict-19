import NewUserRangView from './view/user-rang-view.js';
import {render, RenderPosition} from './framework/render.js';
import NewNavFilmView from './view/nav-films-view.js';

import ContentPresenter from './presenter/content-presenter.js';
import FilmInfoModel from './model/film-info-model.js';
import { generateFilter } from './mock/filters-mock.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const body = document.querySelector('body');

const filmInfoModel = new FilmInfoModel();

const filters = generateFilter(filmInfoModel.cards);

const contentPresenter = new ContentPresenter({
  filmContainer:siteMainElement,
  filmInfoModel,
  mainBody:body,

});

render(new NewUserRangView(), siteHeaderElement);
render(new NewNavFilmView({filters}), siteMainElement, RenderPosition.AFTERBEGIN);

contentPresenter.init();

