import { HEAL, STRIKE, RESET_GAME } from '../actions';


export default function (state = 100, action) {
	switch(action.type) {
		default:
		return state;

		case HEAL:
		return state + action.payload;

		case STRIKE:
		return state - action.payload;

		case RESET_GAME:
		return 100;

	}
}