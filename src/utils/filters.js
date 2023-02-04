import {FilterType} from '../const.js';


const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.watchlist === true),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.favorite === true),


};


export {
  filter
};
