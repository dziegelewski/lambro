import { melee, shield, potion, SHIELDS_RANKS, MELEE_RANKS } from 'consts';
import { minus, notBiggerThan, aboveZero, toPowerOf } from 'utils/functional';
import flow from 'lodash/flow';

export class Item {
	constructor(id, stat, options) {
		this.id = id;
		this.isUsed = false;
		this.stat = stat;
		this.options = options;
		this.applyCustomOptions();
	}

	applyCustomOptions() {
		const { options } = this;
		for (const prop in options) {
			this[prop] = options[prop];
		}
	}
}

export class Wearable extends Item {
	constructor(id, stat = 1, type, options = {}) {
		super(id, stat, options);
		this.isWearable = true;
		this.type = type;
		this.rank = this.grantRank();
		this.price = this.calculatePrice();
	}

	grantRank() {
		return flow(
			Math.sqrt,
			Math.floor,
			minus(2),
			aboveZero,
			notBiggerThan(this.maxRank)
		)(this.stat);
	}

	calculatePrice() {
		return flow(
			toPowerOf(1.5),
			Math.floor,
		)(this.stat);
	}

	get maxRank() {
		switch(this.type) {
			case melee:
			return MELEE_RANKS;
			break;

			case shield:
			return SHIELDS_RANKS;
			break;

			default:
			return 1;
			break;
		}
	}
}


export class Potion extends Item {
	constructor(id, stat = 15, options = {}) {
		super(id, stat, options);
		this.rank = 1;
		this.type = potion;
		this.isWearable = false;
		this.price = 0;
	}
}