import {
	FORGE_STARTING_MASTERY,
	wearable,
	melee,
	shield,
	potion
} from "consts";
import { chances } from 'utils/helpers';
import { Wearable, Potion } from "classes/Item";
import random from "lodash/random";
import times from "lodash/times";

class Forge {
	constructor(craftedByFar) {
		this.initialCraftedByFar = craftedByFar;
		this.craftedByFar = craftedByFar;
		this.buffs = [];
	}

	startOver() {
		this.craftedByFar = this.initialCraftedByFar;
		this.buffs = [];
	}

	craft(itemType, options) {
		this.craftedByFar++;
		const type = itemType || this.whatWillBeCrafted();
		const id = this.generateItemId();
		let stat;

		if (type === potion) {
			stat = this.calculatePotionStat();
			return new Potion(id, stat, options);
		} else {
			stat = this.calculateWearableStat();
			return new Wearable(id, stat, type, options);
		}
	}

	craftMany(numberofItemsToCraft) {
		return times(numberofItemsToCraft, this.craft.bind(this));
	}

	willSomethingBeCrafted() {
		return chances(1 / 5);
	}

	whatWillBeCrafted() {
		const supertype = chances(1 / 3) ? potion : wearable;
		let type;

		if (supertype === wearable) {
			type = chances(1 / 2) ? melee : shield;
		} else {
			type = potion;
		}

		return type;
	}

	calculatePotionStat() {
		return this.mastery * 30;
	}

	calculateWearableStat() {
		return Math.floor(random(10, 30) * this.mastery / 10);
	}

	generateItemId() {
		return new Date().getTime();
	}

	get mastery() {
		return Math.ceil(this.craftedByFar / 10);
	}
}

export default new Forge(FORGE_STARTING_MASTERY);
