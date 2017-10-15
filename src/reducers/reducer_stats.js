import { NEW_PLAYER } from '../consts';
import { RESET_GAME } from '../actions'

export default function(state = NEW_PLAYER, action) {
	switch(action.type) {
		default:
		return state;

		case RESET_GAME:
		return NEW_PLAYER;

	}
}