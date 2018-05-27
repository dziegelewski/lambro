import {
	getHeroDamage,
	getMercenariesTotalAttack,
	getHeroDefense,
	canHealingPotionBeUsed
} from 'utils/reducerHelpers'

import mercenaries from 'utils/mercenaries';

import { notBiggerThan, pipe, oneForEvery, multiply } from 'utils/functional';

export default function stateWrapper(state) {
	const attack = getHeroDamage(state) + getMercenariesTotalAttack(state);
	const defense = getHeroDefense(state);
	const potionsEnabled = canHealingPotionBeUsed(state);
	const mercenariesAffordability = mercenaries.map(mercenary => mercenary.cost <= state.money);
	const isHeroDead = state.hero.isDead;

	const maxPack = getMaxPack(state);

	return {
		...state,
		attack,
		defense,
		mercenariesAffordability,
		potionsEnabled,
		isHeroDead,
		maxPack
	}	
}

const getMaxPack = state =>  12 + pipe(
	state.round,
	oneForEvery(4),
	multiply(4),
	notBiggerThan(12),
)