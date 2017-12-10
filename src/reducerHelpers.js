import Forge from './Forge';
import random from 'lodash/random';
import { startingState, melee, mercenaries, potion } from './consts';

export const emptyItem = { stat: 0 };

function produceStartingState() {
	return { ...startingState, mercenariesNumber: mercenaries.map(() => 0) }
}

function nextRound(state) {

	state = powerUpEnemy(state);
	state = healHero(state, { healing: 9999, isRegenerating: true});

	return {
		...state,
		round: state.round + 1
	};
}

function powerUpEnemy(state) {
	let { enemy } = state;

	const increaseMaxLife = value => Math.floor(value * 1.1);
	const increaseDamage = value => Math.floor(value * 1.2);

	const increasedLife = increaseMaxLife(enemy.maxLife);
	const increasedDamage = increaseDamage(enemy.damage);

	enemy = {
			life: increasedLife,
			maxLife: increasedLife,
			damage: increasedDamage
	};

	return {
		...state,
		enemy
	}
}

function healHero(state, { healing, isRegenerating = false }) {
	const { hero } = state;
	const { maxLife, isDead } = hero;

	const willHeroBecomeFullyHealth = heroNewLife =>  heroNewLife === maxLife;
	const willHeroRemainDead = heroNewLife => isDead && !willHeroBecomeFullyHealth(heroNewLife);
	const computeNewHeroLife = (healing, hero) => {
		const { life, maxLife, isDead, isRegenerating } = hero;
		const isHeroRegeneratingFromDead = isRegenerating && isDead;

		if (isHeroRegeneratingFromDead) {
			healing *= 3;
		}

		return Math.min(maxLife, life + healing);
	};

	const heroNewLife = computeNewHeroLife(healing, hero);

	if (isDead && !isRegenerating) {
		return state;
	}

	return {
		...state,
		hero: {
			...hero,
			life: heroNewLife,
			isDead: willHeroRemainDead(heroNewLife)
		}
	}
}


function onHeroStrike(state) {
		const { hero, enemy, money, inventory } = state;

		if (hero.isDead) {
			return state
		}

		const computeDealedDamage = function() {
			return random(1,5) + getActiveItem(inventory, melee).stat;
		};
		
		const damageToDeal = computeDealedDamage();
		const newHeroLife = hero.life - enemy.damage;
		const isHeroGotKilled = newHeroLife <= 0;
		const newEnemyLife = enemy.life - damageToDeal;
		const isEnemyGotKilled = newEnemyLife <= 0;
		const newMoneyAmount = money + 10;
		const isItemCrafted = Forge.willSomethingBeCrafted();

		state = {
			...state,
			hero: {
				...hero,
				life: newHeroLife
			},
			enemy: {
				...enemy,
				life: newEnemyLife
			},
			money: newMoneyAmount
		}

		if (isHeroGotKilled) {
			state.hero.life = 0;
			state.hero.isDead = true
		}

		if (isEnemyGotKilled) {
			state = nextRound(state);
		}

		if (isItemCrafted) {
			state = addRandomItemToInventory(state)
		}

		return state;
}




function hireMercenary(state, mercenaryIndex) {
	
	const mercenaryType = mercenaries[mercenaryIndex]
	const mercenaryCost = mercenaryType.cost;

	if (hasEnoughMoney(state, mercenaryCost)) {
		state = payMoney(state, mercenaryCost);
		state.mercenariesNumber[mercenaryIndex] ++;
	}

	return state;
}

		

function useItem(state, item) {
	const { type } = item;
	if (item.isWearable) {

		if (hasActiveItem(state, type)) {
			const activeItem = getActiveItem(state, type);
			state = putItemOff(state, activeItem);
		}

		state = putItemOn(state, item);

	}

	if (item === potion) {
		const healingPower = item.stat
		state = healHero(state, { healing: healingPower })
		state = removeItem(state, item);
	}

	return state;
}

function getActiveItem(inventory, itemType) {
		return inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || emptyItem
}

function hasActiveItem(inventory, itemType) {
	return getActiveItem(inventory, itemType) !== emptyItem;
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
				inventoryItem.iwhsUsed = false;
			}
			return inventoryItem
		})
	}
}

function removeItem(state, item) {
	const { id } = item;
	return 	{...state,
			inventory: state.inventory.filter(inventoryItem => inventoryItem.id !== id)
		}
}

function sellItem(state, item) {
	state = getMoney(state, item.price);
	state = removeItem(state, item)
}

function addItemToInventory(state, item) {
	const inventory = [...state.inventory, item];

	return {
		...state,
		inventory
	}
}

function addRandomItemToInventory(state) {
	const randomItem = Forge.craft();
	return addItemToInventory(state, randomItem);
}

function moneyChange(state, amount) {
	const { money } = state;
	return {...state,
		money: money + amount
	}
}

function getMoney(state, amount) {
	return moneyChange(state, amount);
}

function payMoney(state, amount) {
	return moneyChange(state, -amount);
}

function hasEnoughMoney(state, amount) {
	return state.money >= amount;
}


export default {
	produceStartingState,
	healHero,
	onHeroStrike,
	getActiveItem,
	hasActiveItem,
	hireMercenary,
	nextRound,
	moneyChange,
	useItem,
	putItemOn,
	putItemOff,
	sellItem
}