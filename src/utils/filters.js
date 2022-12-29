import {FilterType} from '../const.js';


const filter = {
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.watchlist === '--active'),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched === '--active'),
  [FilterType.FAVORITE]: (cards) => cards.filter((card) => card.userDetails.favorite === '--active'),


};


export {
  filter
};
