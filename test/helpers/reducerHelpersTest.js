import helpers, { emptyItem }  from '../../src/reducerHelpers';
import Forge  from '../../src/Forge';

let state = {};

function resetState() {
	state = helpers.produceStartingState();
}

function pushSomeItemsToInventory() {
	state.inventory = [...Forge.craftMany(5)];
}

function forBothWearabeTypes(fn) {
	['melee', 'shield'].forEach(fn);
}

describe('reducerHelpers', function () {
	beforeEach(resetState);

	describe('getActiveItem', function() {
		beforeEach(pushSomeItemsToInventory)

		forBothWearabeTypes(type => {
			describe(type, () => {
				it('no item should be used by default', () => {
					const { inventory } = state;

					const usedItemOfType = helpers.getActiveItem(inventory, type);
					expect(usedItemOfType).to.be.deep.equal(emptyItem);
				})
				
				it('should return correct item after the item was put on', () => {
					const inventory = state.inventory;

					const itemToPutOn = Forge.craft(type);
					inventory.push(itemToPutOn);
					state = helpers.putItemOn(state, itemToPutOn);

					const usedItem = helpers.getActiveItem(inventory, type);
					expect(usedItem).to.be.equal(itemToPutOn)
				})
					
				it.skip('should return empty when item was put off', () => {
					const inventory = state.inventory;
					const itemToInteractWith = Forge.craft(type);
					inventory.push(itemToInteractWith);
					state = helpers.putItemOn(state, itemToInteractWith);

					state.helpers.putItemOff(state, itemToInteractWith);

					const usedItem = helpers.getActiveItem(inventory, type);
					expect(usedItem).to.be.equal(emptyItem)
				})

			})
		})
	})

	describe('onHeroStrike()', () => {

		function strike() {
			state = stateAfterStrike();
		}

		function stateAfterStrike() {
			return helpers.onHeroStrike(state);
		}

		it('should change nothing if hero is dead', () => {
			state.hero.isDead = true;
			const newState = stateAfterStrike();

			expect(state).to.be.equal(newState);

		})

		it('should make hero dead if his life reached 0', () => {
			state.hero.life = 1;

			strike();

			const isHeroDead = state.hero.isDead;
			expect(isHeroDead).to.be.true;
		})

		it('should move to the next round if the enemy got killed', () => {
			state.hero.isDead = false;
			state.enemy.life = 1;

			const round = state.round;
			const newRound = stateAfterStrike().round;

			expect(newRound).to.be.equal(round + 1);
		})

	})


	describe('nextRound()', () => {

		function nextRound() {
			state = helpers.nextRound(state);
		}

		it('should fully heal hero', () => {
			state.hero.life = 1;
			nextRound();

			expect(state.hero.life).to.be.equal(state.hero.maxLife);
		})

		it('should fully heal enemy', () => {
			state.enemy.life = 1;
			nextRound();
			
			expect(state.enemy.life).to.be.equal(state.enemy.maxLife);
		})

		it('should make enemy stronger', () => {
			const oldMaxLife = state.enemy.maxLife;
			const oldDamage = state.enemy.damage;

			nextRound();

			const newMaxLife = state.enemy.maxLife;
			const newDamage = state.enemy.damage;

			expect(newMaxLife).to.be.above(oldMaxLife);
			expect(newDamage).to.be.above(oldDamage);
		})

	})

})