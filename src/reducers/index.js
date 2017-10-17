import { combineReducers } from 'redux';
import ReducerGame from './reducer_game';

const rootReducer = combineReducers({
	game: ReducerGame
})

export default rootReducer;