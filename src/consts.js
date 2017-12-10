export const wearable = 'wearable';
export const melee = 'melee';
export const shield = 'shield';
export const potion = 'potion';

export const MAX_PACK = 24;
export const FORGE_STARTING_MASTERY = 1;
export const STARTING_MONEY = 100;

export const mercenaries = [
	{
		id: 0,
		name: 'warrior',
		cost: 10,
		attack: 3
	},

	{
		id: 1,
		name: 'mage',
		cost: 30,
		attack: 10
	},

	{
		id: 2,
		name: 'devil',
		cost: 100,
		attack: 50
	}
]

export const startingState = {
		round: 1,
		score: 0,

		hero: {
			life: 100,
			maxLife: 100,
			isDead: false,
			attack: 1,
			defense: 1
		},

		enemy: {
			life: 100,
			maxLife: 100,
			damage: 5
		},

		money: 100,

		mercenaries,
		inventory: []
}