import { MERCENARIES } from '../consts';
import { cloneArray } from '../functions';
import { HIRE_MERCENARY, RESET_GAME } from '../actions';

export default function(state = cloneArray(MERCENARIES), action) {
	switch(action.type) {

		default:
		return state;

		case HIRE_MERCENARY:
		const res = [...state];
		res[action.payload].number ++;
		return res;

		case RESET_GAME:
		return cloneArray(MERCENARIES);
	}
}