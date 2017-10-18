import { potion, melee, shield } from './consts';
import sample from 'lodash/sample';

export class Item {
	constructor(id, stat, options) {
		this.id = id;
		this.isUsed = false;
		this.stat = stat;
		this.options = options;
		this.applyOptions();
	}

	applyOptions() {
		const { options } = this;
		for (const prop in options) {
			this[prop] = options[prop];
		}
	}

}

export class Wearable extends Item {
	constructor(id, stat = 1, options = {}) {
		super(id, stat, options);
		this.isWearable = true;
		this.type = this.determineType();
		this.rank = this.grantRank();
		this.price = this.calculatePrice()

	}

	determineType() {
		return sample([melee, shield]);
	}

	grantRank() {
		return Math.floor(this.stat/4.5);
	}

	calculatePrice() {
		return Math.floor(Math.pow(this.stat, 1.5))
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