import { FORGE_STARTING_SKILL, melee, shield, potion } from './consts';
import random from 'lodash/random';
import times from 'lodash/times';

class Forge {

	constructor(skill) {
		this.lvl = skill;
		this.nextItemId = 0;
		this.buffs = [];
	}

	startFromScratch() {
		// this = new Forge(FORGE_STARTING_SKILL)
	}

	buff(buffs = {}) {
		Object.assign(this.buffs, buffs)
	}

	get skill() {
		return Math.floor(this.lvl)
	}

	upgrade() {
		this.lvl += 0.05;
	}

	grantRank(stat) {
		return Math.floor(stat/4.5);
	}

	brew(options = {}) {
		this.upgrade();
		return Object.assign({
			id: this.nextItemId++,
			type: potion,
			stat: this.skill * 15,
			rank: 0
		}, options)
	}

	craft(options = {}) {
		this.upgrade();
		const item = Object.assign({
			id: this.nextItemId++,
			isUsed: false,
			isWearable: true,
			type: random(0,2) ? melee : shield,
			stat: Math.floor((random(10,30) * this.skill)/10)
		}, options)

		this.buffs.forEach(({parameter, value}) => {
			if (item.hasOwnProperty(parameter)) {
				item[parameter] += value;
			}
		})

		item.rank = options.rank || this.grantRank(item.stat);
		item.price = Math.floor(Math.pow(item.stat, 1.5));

		return item;
	}

	craftMany(number) {
		return times(number, this.craft.bind(this));
	}
}

export default new Forge(FORGE_STARTING_SKILL)