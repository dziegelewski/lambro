import {
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
	constructor(mastery) {
		this.mastery = mastery;
		this.buffs = [];
	}

	craft(itemType, options) {
		this.mastery++;
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
		return chances(1 / 12);
	}

	whatWillBeCrafted() {
		const supertype = chances(1 / 2) ? potion : wearable;
		let type;

		if (supertype === wearable) {
			type = chances(1 / 2) ? melee : shield;
		} else {
			type = potion;
		}

		return type;
	}

	calculatePotionStat() {
		return this.craftingPower * 30;
	}

	calculateWearableStat() {
		return Math.floor(random(10, 30) * this.craftingPower / 5) + 1;
	}

	generateItemId() {
		return new Date().getTime();
	}


	get craftingPower() {
		return Math.ceil(this.mastery / 10);
	}

	static rebuild(forge) {
		return new Forge(forge.mastery);
	}
}

export default Forge;
