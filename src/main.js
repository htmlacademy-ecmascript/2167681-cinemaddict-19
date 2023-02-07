import ContentPresenter from './presenter/content-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmInfoModel from './model/film-info-model.js';
import FilterFilmsModel from './model/filter-model.js';
import FilmsApiService from './films-api-service.js';
import CommentsApiService from './comment-api-service.js';
import FilmsCommentsModel from './model/films-comments-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');


const AUTHORIZATION = 'Basic h2h1gwgretwjukfewrgwewegegqwdqwe';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const body = document.querySelector('body');

const filmsCommentsModel = new FilmsCommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});

const filterFilmModel = new FilterFilmsModel();
const filmInfoModel = new FilmInfoModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION),
});


const contentPresenter = new ContentPresenter({
  header: siteHeaderElement,
  filmContainer:siteMainElement,
  filmInfoModel,
  mainBody:body,
  filterFilmModel,
  filmsCommentsModel,

});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterFilmModel,
  filmInfoModel
});


contentPresenter.init();
filterPresenter.init();
filmInfoModel.init();

