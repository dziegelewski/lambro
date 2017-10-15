import { STRIKE, MONEY_CHANGE, RESET_GAME } from '../actions'
import { STARTING_MONEY } from '../consts'

export default function(state = STARTING_MONEY, action) {
	switch(action.type) {
		
		default:
		return state;

		case RESET_GAME:
		return STARTING_MONEY;

		case MONEY_CHANGE:
		return state + action.payload;

		case STRIKE:
		return state + action.payload;
	}
}