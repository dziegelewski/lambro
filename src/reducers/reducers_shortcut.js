import {
	RESET_GAME,
	STRIKE,
	HIRE_MERCENARY,
	REGENERATE,
	USE_ITEM,
	SELL_ITEM,
	NEXT_ROUND
} from "actions";

import stateWrapper from 'utils/reducerWrapper';
import {
	produceStartingState,
	healHero,
	onHeroStrike,
	hireMercenary,
	useItem,
	sellItem,
	nextRound
} from "utils/reducerHelpers";

function useHelper(state, { type, payload }) {
	switch (type) {
		default:
			return state;

		case REGENERATE:
			return healHero(state, payload);

		case RESET_GAME:
			return produceStartingState();

		case STRIKE:
			return onHeroStrike(state);

		case NEXT_ROUND:
			return nextRound(state);

		case HIRE_MERCENARY:
			return hireMercenary(state, payload);

		case USE_ITEM:
			return useItem(state, payload);

		case SELL_ITEM:
			return sellItem(state, payload);
	}
}

export default function(state = produceStartingState(),	action) {
	return stateWrapper(useHelper(state, action));
}
