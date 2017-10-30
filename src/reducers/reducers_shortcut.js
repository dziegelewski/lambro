import { STRIKE, RESET_GAME, HEAL, HIRE_MERCENARY, MONEY_CHANGE, REMOVE_ITEM, PUT_ITEM_ON, PUT_ITEM_OFF } from '../actions';
import helpers  from '../reducerHelpers';
import Forge from '../Forge';

export default function(state = helpers.produceStartingState(), { type, payload }) {

	switch(type) {

		default:
			return state;

		case RESET_GAME:
			Forge.startOver();
			return helpers.produceStartingState();

		case STRIKE:
			return helpers.onHeroStrike(state)

		case MONEY_CHANGE:
			return helpers.moneyChange(state, payload)

		case HEAL:
			return helpers.healHero(state, payload);

		case HIRE_MERCENARY:
			return helpers.hireMercenary(state, payload)

		case REMOVE_ITEM:
			return helpers.removeItem(state, payload)

		case PUT_ITEM_ON:
			return helpers.putItemOn(state, payload)

		case PUT_ITEM_OFF:
			return helpers.putItemOff(state, payload)
	}
}