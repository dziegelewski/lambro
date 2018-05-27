import cloneDeep from 'lodash/cloneDeep';
import Forge from 'classes/Forge';
import { startingState, melee, shield, potion } from 'consts';
import mercenaries from 'utils/mercenaries';
import { aboveZero, nonNegative } from 'utils/helpers';
// import { Excalibur } from 'utils/artifacts'

export const emptyItem = { stat: 1 };


export function produceStartingState() {
	return {
		...cloneDeep(startingState),
		_forge: new Forge(),
		mercenaries,
		inventory: [],

		mercenariesNumber: mercenaries.map(() => 0)
	}
}

export function nextRound(state) {

	state.enemy.isDead = false;
	state = powerUpEnemy(state);
	state = healHero(state, { healing: 9999, isRegenerating: true});

	return {
		...state,
		round: state.round + 1
	};
}

export function powerUpEnemy(state) {
	let { enemy } = state;

	const increaseMaxLife = value => Math.floor(value * 1.5) + 50;
	const increaseDamage = value => Math.floor(value * 1.35);

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

export function healHero(state, { healing, isRegenerating = false }) {
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

export function resurrectHero(state) {
	return {
		...state,
		hero: {
			...state.hero,
			isDead: false
		}
	};
}

export function increaseHeroMaxLife(state, increasment) {
	return {
		...state,
		hero: {
			...state.hero,
			maxLife: state.hero.maxLife + increasment
		}
	};
} 

export function isHeroFullyHealed(state) {
	return state.hero.life === state.hero.maxLife;
}

export function isHeroDead(state) {
	return state.hero.isDead;
}

export function onHeroStrike(state) {
		const { hero, enemy, attack } = state;

		if (hero.isDead || enemy.isDead) {
			return state;
		}

		const heroDamage = attack;
		state = enemyGotHurt(state, heroDamage);

		const enemyDamage = enemy.damage;
		state = heroGotHurt(state, enemyDamage)

		const isItemObtained = forge(state).willSomethingBeCrafted();

		if (isItemObtained) {
			state = addRandomItemToInventory(state);
		}

		return state;
	}

export function heroGotHurt(state, damage) {
		const { hero, defense } = state;

		damage = aboveZero(damage - defense);

		const heroNewLife = nonNegative(hero.life - damage);
		const isHeroGotKilled = !heroNewLife;
		
		return {
			...state,
			hero: {
				...hero,
				life: heroNewLife,
				isDead: isHeroGotKilled
			}
		}
}

export function enemyGotHurt(state, damage) {
		const { enemy } = state;

		const enemyNewLife = nonNegative(enemy.life - damage);
		const actualDamage = (enemy.life - enemyNewLife);
		const isEnemyGotKilled = !enemyNewLife;

		if (isEnemyGotKilled) {
			state.enemy.isDead = true;
		}
		
		state.enemy.life = enemyNewLife;

		const earnedMoney = Math.round(actualDamage / 10);
		state = getMoney(state, earnedMoney)

		return state;
}


export function getHeroDamage(state) {
	const baseDamage = state.hero.attack;
	const itemDamage = getActiveItem(state, melee).stat;
	return baseDamage + itemDamage;
}

export function getHeroDefense(state) {
	const baseDefense = state.hero.defense;
	const itemDefense = getActiveItem(state, shield).stat;
	return baseDefense + itemDefense;
}

export function hireMercenary(state, mercenaryIndex) {
	const mercenaryCost = mercenaries[mercenaryIndex].cost;

	if (hasEnoughMoney(state, mercenaryCost)) {
		state = payMoney(state, mercenaryCost);
		state.mercenariesNumber[mercenaryIndex] ++;

		if (mercenaryIs('mage', mercenaryIndex)) {
			state = increaseHeroMaxLife(state, 33);
			state = resurrectHero(state);
		}

		if (mercenaryIs('devil', mercenaryIndex)) {
			state = enemyGotHurt(state, state.attack * 66);
		}
	}



	return state;
}

export function getMercenariesTotalAttack(state) {
	return mercenaries.reduce((total, mercenaryType) => {
		return total + (state.mercenariesNumber[mercenaryType.id] * mercenaryType.attack)
	}, 0)
}

export function mercenaryIs(expectedName, mercenaryIndex) {
	return mercenaries[mercenaryIndex].name === expectedName;
}
		

export function useItem(state, item) {
	const { type } = item;
	if (item.isWearable) {
		let activeItem;

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

export function drinkPotion(state, item) {
		if (item.effect === 'heal' && !canHealingPotionBeUsed(state)) return state;

		if (item.effect === 'resurrect' && !state.hero.isDead) return state;

		if (item.effect === 'resurrect') {
			state = resurrectHero(state);
		}

		const healing = item.stat
		state = healHero(state, { healing })
		state = removeItem(state, item);
		return state;
}

export function canHealingPotionBeUsed(state) {
	return !isHeroDead(state) && !isHeroFullyHealed(state);
}

export function getActiveItem(state, itemType) {
		return state.inventory.find(({ isUsed, type }) => isUsed === true && type === itemType ) || emptyItem;
}

export function hasActiveItem(state, itemType) {
	return getActiveItem(state, itemType) !== emptyItem;
}


export function putItemOn(state, item) {
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

export function putItemOff(state, item) {
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

export function removeItem(state, item) {
	const { id } = item;
	return 	{...state,
			inventory: state.inventory.filter(inventoryItem => inventoryItem.id !== id)
		}
}

export function sellItem(state, item) {

	if (getActiveItem(state, item.type) === item) {
		state = putItemOff(state, item);
	}

	state = getMoney(state, item.price);
	state = removeItem(state, item);

	return state;
}


export function isInventoryFull(state) {
	return state.inventory.length >= state.maxPack;
}

export function addItemToInventory(state, item) {
	if (isInventoryFull(state)) return state;

	const inventory = [...state.inventory, item];

	return {
		...state,
		inventory
	};
}

export function addRandomItemToInventory(state) {
	const randomItem = forge(state).craft();
	return addItemToInventory(state, randomItem);
}

export function moneyChange(state, amount) {
	const { money } = state;
	return {...state,
		money: money + amount
	}
}

export function getMoney(state, amount) {
	return moneyChange(state, amount);
}

export function payMoney(state, amount) {
	return moneyChange(state, -amount);
}

export function hasEnoughMoney(state, amount) {
	return state.money >= amount;
}

export function forge(state) {
	const forgeNeedsRebuilding = !(state._forge instanceof Forge);
	if (forgeNeedsRebuilding) {
		state._forge = Forge.rebuild(state._forge);
	}
	return state._forge;
}
