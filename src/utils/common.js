import dayjs from 'dayjs';
import {ACTIVATE_MODE} from '../const.js';

//const DATE_FORMAT = 'D MMMM YYYY H:MM';

// функция генерации случайного числа из заданного диапазонв
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);

}

//функция изменения отображения даты
const humanizeTaskDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';
//функция отображени даты
const getDate = (date) => new Date (date);
//функция отображения текущей даты
const nowDate = () => new Date();

function getRandomIntInclusiveNotFloor(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min + 1) + min;
  return result >= 10 ? 10 : result.toFixed(1);

}
//функция случайного элемента массива
function getRandomIntInclusiveArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// функция получения случайного не повторяющегося числа
function getRandomUniqInt (min, max) {
  const randomIntArray = [];

  return function () {
    let randomInt = getRandomIntInclusive(min, max);
    if (randomIntArray.length >= (max - min + 1)) {
      return null;
    }
    while (randomIntArray.includes(randomInt)) {
      randomInt = getRandomIntInclusive(min, max);
    }
    randomIntArray.push(randomInt);
    return(randomInt);
  };
}

const adaptToUser = (films) => {
  const release = {...films.film_info.release,
    date: films.film_info.release.date !== null ? new Date(films.film_info.release.date) : films.film_info.release.date,
    releaseCountry: films.film_info.release.release_country
  };

  delete release.release_country;

  const filmInfo = {...films.film_info,
    ageRating: films.film_info.age_rating,
    alternativeTitle: films.film_info.alternative_title,
    release: release,
    totalRating: films.film_info.total_rating,
  };

  delete filmInfo.age_rating;
  delete filmInfo.alternative_title;
  delete filmInfo.total_rating;

  const userDetails = {...films.user_details,
    alreadyWatched:  films.user_details.already_watched,
    watchingDate: films.user_details.watching_date !== null ? new Date(films.user_details.watching_date) : films.user_details.watching_date
  };

  delete userDetails.already_watched;
  delete userDetails.watching_date;

  const adaptFilms = {...films,
    filmInfo: filmInfo,
    userDetails: userDetails,
  };

  delete adaptFilms.user_details;
  delete adaptFilms.film_info;


  return adaptFilms;
};

const activateButton	= (buttonData) => buttonData ? ACTIVATE_MODE.ACTIVE : ACTIVATE_MODE.INACTIVE;


// функция для смены данных

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);


//сортировки

const sortRating = (a,b) => a.filmInfo.totalRating > b.filmInfo.totalRating ? -1 : 1;

const sortDate = (a,b) => a.filmInfo.release.date > b.filmInfo.release.date ? -1 : 1;


export {
  getRandomIntInclusive,
  getRandomIntInclusiveNotFloor,
  getRandomIntInclusiveArrayElement,
  getDate,
  nowDate,
  getRandomUniqInt,
  humanizeTaskDueDate,
  updateItem,
  activateButton,
  sortRating,
  sortDate,
  adaptToUser
};
