import { melee, shield, potion, SHIELDS_RANKS, MELEE_RANKS } from 'consts';

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
		const calculatedRank = Math.floor(Math.sqrt(this.stat, 2)) - 1;
		return Math.min(this.maxRank, calculatedRank);
	}

	calculatePrice() {
		return Math.floor(Math.pow(this.stat, 1.5))
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
			return 0;
			break;
		}
	}
}


export class Potion extends Item {
	constructor(id, stat = 15, options = {}) {
		super(id, stat, options);
		this.rank = 0;
		this.type = potion;
		this.isWearable = false;
		this.price = 0;
	}
}