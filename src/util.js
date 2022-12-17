import dayjs from 'dayjs';


const DATE_FORMAT = 'D MMMM YYYY';

// функция генерации случайного числа из заданного диапазонв
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min + 1) + min).toFixed(1);
}

//функция изменения отображения даты
const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
//функция отображени даты
const getDate = (date) => new Date (date);
//функция отображения текущей даты
const nowDate = () => new Date();

function getRandomIntInclusiveNotFloor(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min + 1) + min;
  if (result >= 10) {
    return 10;
  }
  return result.toFixed(1);
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


export {
  getRandomIntInclusive,
  getRandomIntInclusiveNotFloor,
  getRandomIntInclusiveArrayElement,
  getDate,
  nowDate,
  getRandomUniqInt,
  humanizeTaskDueDate,
};
