import { RESET_GAME, STRIKE, HIRE_MERCENARY, REGENERATE, USE_ITEM, SELL_ITEM } from '../actions';
import helpers  from '../reducerHelpers';
import Forge from '../Forge';

const { stateWrapper } = helpers;

export default function(state = helpers.produceStartingState(), { type, payload }) {

	switch(type) {

		default:
			return state;
			
		case REGENERATE:
			return stateWrapper(helpers.healHero(state, payload));

		case RESET_GAME:
			Forge.startOver();
			return stateWrapper(helpers.produceStartingState());

		case STRIKE:
			return stateWrapper(helpers.onHeroStrike(state));

		case HIRE_MERCENARY:
			return stateWrapper(helpers.hireMercenary(state, payload));

		case USE_ITEM:
			return stateWrapper(helpers.useItem(state, payload));

		case SELL_ITEM:
			return stateWrapper(helpers.sellItem(state, payload));

	}
}