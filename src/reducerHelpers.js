import Forge from './Forge';
import random from 'lodash/random';
import { startingState, melee, mercenaries } from './consts';

function produceStartingState() {
	return { ...startingState, mercenariesNumber: mercenaries.map(() => 0) }
}

function nextRound(state) {
	return {
		...state,
			round: state.round++,
			enemy: powerUpEnemy(state.enemy),
			hero: fullyHealHero(state.hero)
	}
}

function powerUpEnemy(enemy) {
	const increaseMaxLife = function(value) {
					return Math.floor(value * 1.1);
				},
				increaseDamage = function(value) {
					return Math.floor(value * 1.2);
				},
				increasedLife = increaseMaxLife(enemy.maxLife),
				increasedDamage = increaseDamage(enemy.damage);

	return {
			maxLife: increasedLife,
			life: increasedLife,
			damage: increasedDamage
	}
}

function healHero(state, { healing, isRegenerating }) {
	const { hero } = state,
		{ life, maxLife, isDead } = hero,

		willHeroBeFullyHealth = function() {
			return newLife === maxLife;
		},
		
		willHeroRemainDead = function() {
			return isDead && !willHeroBeFullyHealth();
		},

		computeNewLife = function() {
			if (isDead && isRegenerating) {
				healing *= 3;
			}
			return Math.min(maxLife, life + healing);
		},

		newLife = computeNewLife();

	if (isDead && !isRegenerating) {
		return state;
	}

	return {
		...state,
		hero: {
			...hero,
			life: newLife,
			isDead: willHeroRemainDead()
		}
	}
}

function fullyHealHero(hero) {
	return {
		...hero,
		life: hero.maxLife,
		isDead: false
	}
}

function onHeroStrike(state) {
		const { hero, enemy, money, inventory } = state,
			computeDealedDamage = function() {
				return random(1,5) + getUsedItem(inventory, melee).stat;
			},
			damageToDeal = computeDealedDamage();

		if (hero.isDead) {
			return state
		}

		let res = {
			...state,
			hero: {
				...hero,
				life: hero.life - enemy.damage
			},
			enemy: {
				...enemy,
				life: enemy.life - damageToDeal
			},
			money: money + 10
		}

		if (res.enemy.life <= 0) {
			res = nextRound(res);
		}

		if (res.hero.life <= 0) {
			res.hero.life = 0;
			res.hero.isDead = true
		}

		if (Forge.willSomethingBeCrafted()) {
			res.inventory = [...res.inventory, Forge.craft()]
		}

		return res;
}

function getUsedItem(inventory, itemType) {
		return inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || { stat: 0 }
}


function hireMercenary(state, mercenaryIndex) {
	const { mercenariesNumber } = state;
	mercenariesNumber[mercenaryIndex] ++;
	return {
		...state,
		mercenariesNumber
	}
}

		
function removeItem(state, item) {
	const { id } = item;
	return 	{...state,
			inventory: state.inventory.filter(inventoryItem => inventoryItem.id !== id)
		}
}

function putItemOn(state, item) {
	const { id, type } = item;
	return {...state,
		inventory: state.inventory.map(inventoryItem => {
			if (inventoryItem.type === type) {
				inventoryItem.isUsed = inventoryItem.id === id;
			}
			return inventoryItem
		})
	}
}

function putItemOff(state, item) {
	const { type } = item;
	return {...state,
		inventory: state.inventory.map(inventoryItem => {
			if (inventoryItem.type === type) {
				inventoryItem.isUsed = false;
			}
			return inventoryItem
		})
	}
}

function moneyChange(state, amount) {
	const { money } = state;
	return {...state,
		money: money + amount
	}
}

export default {
	produceStartingState,
	powerUpEnemy,
	fullyHealHero,
	healHero,
	onHeroStrike,
	getUsedItem,
	hireMercenary,
	removeItem,
	putItemOn,
	putItemOff,
	nextRound,
	moneyChange
}