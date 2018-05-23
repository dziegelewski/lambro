import {
	RESET_GAME,
	STRIKE,
	HIRE_MERCENARY,
	REGENERATE,
	USE_ITEM,
	SELL_ITEM
} from "actions";
import helpers from "utils/reducerHelpers";
import Forge from "classes/Forge";

const { stateWrapper } = helpers;

function useHelper(state, { type, payload }) {
	switch (type) {
		default:
			return state;

		case REGENERATE:
			return helpers.healHero(state, payload);

		case RESET_GAME:
			Forge.startOver();
			return helpers.produceStartingState();

		case STRIKE:
			return helpers.onHeroStrike(state);

		case HIRE_MERCENARY:
			return helpers.hireMercenary(state, payload);

		case USE_ITEM:
			return helpers.useItem(state, payload);

		case SELL_ITEM:
			return helpers.sellItem(state, payload);
	}
}

export default function(state = helpers.produceStartingState(),	action) {
	return stateWrapper(useHelper(state, action));
}
