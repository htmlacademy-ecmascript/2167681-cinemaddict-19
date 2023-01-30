//всего 7 фильмов
const FILM_ID = {
  min: 1,
  max: 7,
};
//названия фильмов
const FILM_NAME = ['Made for Each Other', 'Popeye meets Sindbad', 'Sagebrush Trail', 'Santa Claus conquers the martians',
  'The dannce of life', 'The great flamarion', 'The man with the golden arm',
];

const COMMENTS_AMOUNT = 5;

const DURATION = ['0 1:45', '0 2:10', '0 1:20', '0 6:40', '0 4:20', '0 0:40'];

const DATE = ['2001.12.21', '1993.11.8', '2014.4.7', '1900.5.12', '1979.2.1', '1988.2.5', '1945.1.1', '2007.8.12'];

const BUTTON_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};


const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const GENRE = ['Боевик', 'Драма', 'Фэнтэзи', 'Артхаус', 'Криминал'];

const AGE_RATING = ['+6', '+16', '+18'];

const COUNTRY = ['Армения', 'Россия', 'США', 'Канада', 'Франция', 'Гватемала', 'Гондурас'];

const POSTER = ['made-for-each-other.png',
  'popeye-meets-sinbad.png', 'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];
//случайное число c десятичой дробью от 1 до 10
const TOTAL_RAITING = {
  min: 1,
  max: 10,
};

//ФИ актеров и режисеров и др людей
const NAMES = ['Матвеева Анна',
  'Антонова Милана',
  'Клюева Ева',
  'Федоров Даниил',
  'Лукин Александр',
  'Виноградов Александр',
  'Кузнецов Андрей',
  'Гончаров Константин',
  'Соколов Иван',
  'Лапшин Артемий',
  'Широков Михаил',
  'Федоров Адам',
  'Швецов Артемий',
  'Карпова Таисия',
  'Дубов Вадим',
  'Гусев Михаил',
  'Данилов Николай',
  'Нечаев Егор',
  'Быкова Майя',];


export {
  NAMES,
  TOTAL_RAITING,
  POSTER,
  COUNTRY,
  AGE_RATING,
  GENRE,
  FILM_ID,
  FILM_NAME,
  DESCRIPTIONS,
  BUTTON_STATUS,
  DATE,
  DURATION,
  EMOTION,
  COMMENTS_AMOUNT,
};
