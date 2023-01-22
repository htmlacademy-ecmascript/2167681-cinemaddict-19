import {FilterType} from '../const.js';


const filter = {
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.watchlist === true),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched === true),
  [FilterType.FAVORITE]: (cards) => cards.filter((card) => card.userDetails.favorite === true),


};


export {
  filter
};
