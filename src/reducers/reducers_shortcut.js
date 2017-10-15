import { combineReducers } from 'redux';
import ReducerGame from './reducer_game';
import ReducerItems from './reducer_items';
import ReducerLife from './reducer_life';
import ReducerMoney from './reducer_money';
import ReducerMercenaries from './reducer_mercenaries';

const rootReducer = combineReducers({
	game: ReducerGame,
	inventory: ReducerItems,
	life: ReducerLife,
	money: ReducerMoney,
	mercenaries: ReducerMercenaries
})

export default rootReducer;