import dayjs from 'dayjs';


//функция изменения отображения даты
const humanizeTaskDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';


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

//сортировки

const sortRating = (a,b) => a.filmInfo.totalRating > b.filmInfo.totalRating ? -1 : 1;

const sortDate = (a,b) => a.filmInfo.release.date > b.filmInfo.release.date ? -1 : 1;

const changeToHoursMinutes = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  return `0 ${hours}:${minutes}`;
};

const checkDescriptionLength = (desc) => {
  if (desc.length > 140) {
    return `${desc.substring(0, 139)}...`;
  } else {
    return desc;
  }
};

export {
  humanizeTaskDueDate,
  sortRating,
  sortDate,
  adaptToUser,
  changeToHoursMinutes,
  checkDescriptionLength
};
