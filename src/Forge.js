import { FORGE_STARTING_MASTERY, wearable, potion } from './consts';
import { Wearable, Potion } from './Item';
import random from 'lodash/random';
import times from 'lodash/times';

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
		this.craftedByFar ++;
		itemType = itemType || this.whatWillBeCrafted();
		const id = this.nextItemId;
		let stat;
		
		if (itemType === potion) {
			stat = this.calculatePotionStat();
			return new Potion(id, stat, options);
		} else {
			stat = this.calculateWearableStat();
			return new Wearable(id, stat, options);
		}
	}

	craftMany(howMany) {
		return times(howMany, this.craft.bind(this));
	}

	willSomethingBeCrafted() {
		return random(1,3) === 1;
	}

	whatWillBeCrafted() {
		return random(1,3) === 1 ? potion : wearable;
	}

	calculatePotionStat() {
		return this.mastery * 15;
	}

	calculateWearableStat() {
		return Math.floor((random(10,30) * this.mastery)/10);
	}

	get mastery() {
		return Math.ceil(this.craftedByFar/5)
	}

	get nextItemId() {
		return this.craftedByFar;
	}

}

export default new Forge(FORGE_STARTING_MASTERY)