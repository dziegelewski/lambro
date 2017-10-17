import { STRIKE, RESET_GAME, HEAL, HIRE_MERCENARY, MONEY_CHANGE, REGENERATE, REMOVE_ITEM, PUT_ITEM, PUT_ITEM_OFF, } from '../actions';
import clone from 'lodash/clone' ;
import { MERCENARIES } from '../consts';

import Forge from '../Forge';


const inventory = [
	...Forge.craftMany(6),
]

const STARTING = {
	round: 1,
	enemyMaxLife: 100,
	enemyCurrentLife: 100,
	enemyDamage: 1,

	money: 100,


	life: 100,
	maxLife: 100,
	isDead: false,

	attack: 1,
	defense: 1,
	exp: 0,
	lvl: 1,

	mercenaries: [
		...MERCENARIES
	],

	inventory

}


function nextRound(state) {
	return {
		...state,
			round: state.round++,
			enemyDamage: Math.floor(state.enemyDamage * 1.5),
			enemyMaxLife: state.enemyMaxLife * 2,
			enemyCurrentLife: state.enemyMaxLife * 2,

			life: 100
	}
}


export default function(state = clone(STARTING), action) {
	switch(action.type) {

		default:
			return state;

		case RESET_GAME:
			return clone(STARTING);

		case STRIKE:

			if (state.isDead) {
				return state
			}

			let stateAfterStrike = {
				...state,
				life: state.life - state.enemyDamage,
				money: state.money + 10,
				enemyCurrentLife: state.enemyCurrentLife - action.payload,
			}

			if (stateAfterStrike.enemyCurrentLife <= 0) {
				stateAfterStrike = nextRound(stateAfterStrike);
			}

			if (stateAfterStrike.life <= 0) {
				stateAfterStrike.life = 0;
				stateAfterStrike.isDead = true
			}

			if (Forge.willSomethingBeCrafted()) {
				stateAfterStrike.inventory = [...stateAfterStrike.inventory, Forge.craft()]
			}

			return stateAfterStrike;


		case MONEY_CHANGE:
			return {
				...state,
				money: state.money + action.payload
			};

		case HEAL:

			if (state.isDead) {
				return state
			}

			return {
				...state,
				life: Math.min(100, state.life + action.payload)
			}

		case REGENERATE:
			const newLife = Math.min(100, state.life + action.payload);
			return {
				...state,
				life: newLife,
				isDead: state.isDead && newLife !== state.maxLife
			}

		case HIRE_MERCENARY:
			let modifiedMercenaries = [...state.mercenaries];
			modifiedMercenaries[action.payload].number ++;
			return {
				...state,
				mercenaries: modifiedMercenaries
			}


		case REMOVE_ITEM:
			return {...state,
				inventory: state.inventory.filter(item => item.id !== action.payload)
			}


		case PUT_ITEM:
			const { id, type } = action.payload;
			return {...state,
				inventory: state.inventory.map(item => {
							if (item.type === type) {
								item.isUsed = item.id === id;
							}
							return item
						})}

		case PUT_ITEM_OFF:
			return {...state,
				inventory: state.inventory.map(item => {
							if (item.type === action.payload.type) {
								item.isUsed = false
							}
							return item
						})}

	}
}