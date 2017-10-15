import { STRIKE, RESET_GAME, NEXT_ROUND } from '../actions';
import clone from 'lodash/clone' ;

const STARTING = {
	round: 1,
	enemyMaxHealth: 100,
	enemyCurrentHealth: 100,
	enemyDamage: 5
}

export default function(state = clone(STARTING), action) {
	const { enemyMaxHealth, enemyDamage } = state;
	const clonedState = clone(state);

	switch(action.type) {

		default:
		return state;

		case RESET_GAME:
		return clone(STARTING);

		case STRIKE:
		return {
			...state,
			enemyCurrentHealth: state.enemyCurrentHealth - action.payload
		};

		case NEXT_ROUND:
		return {
			...state,
			round: state.round++,
			enemyDamage: Math.floor(enemyDamage * 1.5),
			enemyMaxHealth: enemyMaxHealth * 2,
			enemyCurrentHealth: clonedState.enemyMaxHealth,
		}
		
	}
}