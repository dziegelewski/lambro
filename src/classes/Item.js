import { melee, shield, potion, SHIELDS_RANKS, MELEE_RANKS } from 'consts';
import { pipe, minus, notBiggerThan, aboveZero, toPowerOf } from 'utils/functional';
import { chances } from 'utils/helpers';

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
		return pipe(
			this.stat,
			Math.sqrt,
			Math.floor,
			minus(2),
			aboveZero,
			notBiggerThan(this.maxRank)
		);
	}

	calculatePrice() {
		return pipe(
			this.stat,
			toPowerOf(1.25),
			Math.floor,
		);
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
		this.rank = this.grantRank();
		this.type = potion;
		this.isWearable = false;
		this.price = 0;
		this.effect = this.getEffect();
		if (this.effect === 'resurrect') {
			this.stat *= 10;
		}
	}

	grantRank() {
		return chances(1 / 8) ? 2 : 1;
	}

	getEffect() {
		switch(this.rank) {
			case 1:
				return 'heal';
			case 2:
				return 'resurrect'
		}
	}
}