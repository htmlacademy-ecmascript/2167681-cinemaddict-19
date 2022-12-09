import NewUserRangView from './view/user-rang-view.js';
import {render, RenderPosition} from './render.js';
import NewNavFilmView from './view/nav-films-view.js';
import NewFiltersFilmView from './view/filters-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import NewPopuppView from './view/popupp-details-view.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const contentPresenter = new ContentPresenter({filmContainer: siteMainElement});
const body = document.querySelector('body');


render(new NewUserRangView(), siteHeaderElement);
render(new NewFiltersFilmView(), siteMainElement);
render(new NewPopuppView, body);
render(new NewNavFilmView(), siteMainElement, RenderPosition.AFTERBEGIN);


contentPresenter.init();

