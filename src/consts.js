export const wearable = 'wearable';
export const melee = 'melee';
export const shield = 'shield';
export const potion = 'potion';

export const MAX_PACK = 24;
export const FORGE_STARTING_MASTERY = 1;

export const mercenaries = [
	{
		id: 0,
		name: 'warrior',
		cost: 20,
		attack: 1
	},

	{
		id: 1,
		name: 'mage',
		cost: 300,
		attack: 10
	},

	{
		id: 2,
		name: 'devil',
		cost: 5000,
		attack: 100
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

		money: 0,

		mercenaries,
		inventory: []
}