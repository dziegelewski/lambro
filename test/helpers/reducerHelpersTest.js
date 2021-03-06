import * as helpers  from 'utils/reducerHelpers';
import { mercenaries }  from 'consts';
import Forge  from 'classes/Forge';

const { emptyItem } = helpers; 
let state = {};

function resetState() {
	state = helpers.produceStartingState();
}

function pushSomeItemsToInventory() {
	state.inventory = [...new Forge().craftMany(5)];
}

function forBothWearabeTypes(fn) {
	['melee', 'shield'].forEach(fn);
}

describe('reducerHelpers', function () {
	beforeEach(resetState);

	describe.skip('#getActiveItem', function() {
		beforeEach(pushSomeItemsToInventory);

		forBothWearabeTypes(type => {
			describe(type, () => {
				it('no item should be used by default', () => {
					const { inventory } = state;

					const usedItemOfType = helpers.getActiveItem(state, type);
					expect(usedItemOfType).to.be.deep.equal(emptyItem);
				})
				
				it('should return correct item after the item was put on', () => {
					const inventory = state.inventory;

					const itemToPutOn = new Forge().craft(type);
					inventory.push(itemToPutOn);
					state = helpers.putItemOn(state, itemToPutOn);

					const usedItem = helpers.getActiveItem(state, type);
					expect(usedItem).to.be.equal(itemToPutOn);
				})
					
				it('should return empty when item was put off', () => {

					const itemToInteractWith = new Forge().craft(type);
					state.inventory.push(itemToInteractWith);

					state = helpers.putItemOn(state, itemToInteractWith);
					state = helpers.putItemOff(state, itemToInteractWith);

					const usedItem = helpers.getActiveItem(state, type);
					expect(usedItem).to.be.equal(emptyItem)
				})

				it('should return empty when item was used two times respectively', () => {

					const itemToInteractWith = new Forge().craft(type);
					state.inventory.push(itemToInteractWith);

					state = helpers.useItem(state, itemToInteractWith);
					state = helpers.useItem(state, itemToInteractWith);

					const usedItem = helpers.getActiveItem(state, type);
					expect(usedItem).to.be.equal(emptyItem);
				})
			})
		})
	})

	describe('#onHeroStrike()', () => {

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

	});

	describe('#nextRound()', () => {

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

	describe('#hireMercenary()', () => {

		function hireNow(mercenaryIndex = 0) {
			state = helpers.hireMercenary(state, mercenaryIndex);
		}

		function getNumberOfMercs(mercenaryIndex) {
			return state.mercenariesNumber[mercenaryIndex];
		}

		it('should not have any effect if hero doesn\'t have enought money', () => {
			state.money = 0;
			const stateBeforeHiring = { ...state };
			hireNow();
			const stateAfterHiring = state;
			expect(stateBeforeHiring).to.be.deep.equal(stateAfterHiring);
		})


		it('should increase number of mercenaries by 1 if hero has enought money',  () => {
			const mercIndex = 0;
			const numberOfMercs = { before: getNumberOfMercs(mercIndex) };
			state.money = 99999;

			hireNow(mercIndex);
			numberOfMercs.after = getNumberOfMercs(mercIndex)

			expect(numberOfMercs.after).to.be.equal(numberOfMercs.before + 1);

		})
	})
})