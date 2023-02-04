import NewUserRangView from './view/user-rang-view.js';
import {render} from './framework/render.js';
import ContentPresenter from './presenter/content-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmInfoModel from './model/film-info-model.js';
import FilterFilmsModel from './model/filter-model.js';
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const body = document.querySelector('body');

const filterFilmModel = new FilterFilmsModel();
const filmInfoModel = new FilmInfoModel();


const contentPresenter = new ContentPresenter({
  filmContainer:siteMainElement,
  filmInfoModel,
  mainBody:body,
  filterFilmModel,

});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterFilmModel,
  filmInfoModel
});

render(new NewUserRangView(), siteHeaderElement);

contentPresenter.init();
filterPresenter.init();

