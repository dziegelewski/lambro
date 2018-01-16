import cloneDeep from 'lodash/cloneDeep';
import Forge from './Forge';
import { startingState, melee, shield, mercenaries, potion, MAX_PACK } from './consts';
import { aboveZero, nonNegative } from './helpers';

export const emptyItem = { stat: 0 };

function stateWrapper(state) {
	const attack = getHeroDamage(state) + getMercenariesTotalAttack(state);
	const defense = getHeroDefense(state);
	const potionsEnabled = canPotionBeUsed(state);
	const mercenariesAffordability = mercenaries.map(mercenary => mercenary.cost <= state.money);

	return {
		...state,
		attack,
		defense,
		mercenariesAffordability,
		potionsEnabled
	}	
}


function produceStartingState() {
	return {
		...cloneDeep(startingState),
		mercenariesNumber: cloneDeep(mercenaries).map(() => 0)
	}
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

	const increaseMaxLife = value => Math.floor(value * 1.3);
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

function isHeroFullyHealed(state) {
	return state.hero.life === state.hero.maxLife;
}

function isHeroDead(state) {
	return state.hero.isDead;
}

function onHeroStrike(state) {
		const { hero, enemy, attack } = state;

		if (hero.isDead) {
			return state
		}

		const heroDamage = attack;
		state = enemyGotHurt(state, heroDamage);

		const enemyDamage = enemy.damage;
		state = heroGotHurt(state, enemyDamage)

		const isItemObtained = Forge.willSomethingBeCrafted();

		if (isItemObtained) {
			state = addRandomItemToInventory(state)
		}

		return state;
	}

function heroGotHurt(state, damage) {
		const { hero, defense } = state;

		damage = aboveZero(damage - defense);

		const heroNewLife = nonNegative(hero.life - damage);
		const isHeroGotKilled = !heroNewLife;

		console.log({ damage })

		return {
			...state,
			hero: {
				...hero,
				life: heroNewLife,
				isDead: isHeroGotKilled
			}
		}
}

function enemyGotHurt(state, damage) {
		const { enemy } = state;

		const enemyNewLife = nonNegative(enemy.life - damage);
		const isEnemyGotKilled = !enemyNewLife;

		if (isEnemyGotKilled) {
			state = nextRound(state);
		} else {
			state.enemy.life = enemyNewLife;
		}

		const earnedMoney = damage;
		state = getMoney(state, earnedMoney)

		return state;
}


function getHeroDamage(state) {
	const baseDamage = state.hero.attack;
	const itemDamage = getActiveItem(state, melee).stat;
	return baseDamage + itemDamage;
}

function getHeroDefense(state) {
	const baseDefense = state.hero.defense;
	const itemDefense = getActiveItem(state, shield).stat;
	return baseDefense + itemDefense;
}

function hireMercenary(state, mercenaryIndex) {
	const mercenaryCost = mercenaries[mercenaryIndex].cost;

	if (hasEnoughMoney(state, mercenaryCost)) {
		state = payMoney(state, mercenaryCost);
		state.mercenariesNumber[mercenaryIndex] ++;
	}

	return state;
}

function getMercenariesTotalAttack(state) {
	return mercenaries.reduce((total, mercenaryType) => {
		return total + (state.mercenariesNumber[mercenaryType.id] * mercenaryType.attack)
	}, 0)
}
		

function useItem(state, item) {
	const { type } = item;
	if (item.isWearable) {
		let activeItem

		if (hasActiveItem(state, type)) {
			activeItem = getActiveItem(state, type);
			state = putItemOff(state, activeItem);
		}

		if (activeItem !== item) {
			state = putItemOn(state, item);
		}

	} else if (type === potion) {
		state = drinkPotion(state, item)
	}

	return state;
}

function drinkPotion(state, item) {
		if (!canPotionBeUsed(state)) return state;

		const healing = item.stat
		state = healHero(state, { healing })
		state = removeItem(state, item);
		return state;
}

function canPotionBeUsed(state) {
	return !isHeroDead(state) && !isHeroFullyHealed(state);
}

function getActiveItem(state, itemType) {
		return state.inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || emptyItem
}

function hasActiveItem(state, itemType) {
	return getActiveItem(state, itemType) !== emptyItem;
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

function removeItem(state, item) {
	const { id } = item;
	return 	{...state,
			inventory: state.inventory.filter(inventoryItem => inventoryItem.id !== id)
		}
}

function sellItem(state, item) {

	if (getActiveItem(state, item.type) === item) {
		state = putItemOff(state, item);
	}

	state = getMoney(state, item.price);
	state = removeItem(state, item);

	return state;
}


function isInventoryFull(state) {
	return state.inventory.length >= MAX_PACK;
}

function addItemToInventory(state, item) {
	if (isInventoryFull(state)) return state;

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
	stateWrapper,
	produceStartingState,
	healHero,
	onHeroStrike,
	getActiveItem,
	hasActiveItem,
	hireMercenary,
	getMercenariesTotalAttack,
	nextRound,
	moneyChange,
	useItem,
	putItemOn,
	putItemOff,
	sellItem
}