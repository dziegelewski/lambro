export const wearable = 'wearable';
export const melee = 'melee';
export const shield = 'shield';
export const potion = 'potion';

export const FORGE_STARTING_MASTERY = 1;

export const MELEE_RANKS = 7;
export const SHIELDS_RANKS = 3;

export const startingState = {
		round: 1,
		money: 0,

		hero: {
			life: 100,
			maxLife: 100,
			isDead: false,
			attack: 0,
			defense: 0
		},

		enemy: {
			life: 100,
			maxLife: 100,
			damage: 5,
			isDead: false
		},

}