import Forge from '../../src/Forge';
describe('Forge', function () {

    describe('General', function() {
        it('should has gettable mastery level which is a number', function() {
            console.log(Forge.mastery)
            expect(typeof Forge.mastery).to.be.equal('number');
        })
    })

    describe('craft()', function () {
        const craftedItem = Forge.craft();

        it('should be an object', function() {
            expect(typeof craftedItem).to.be.equal('object');
        });

        it('should has isWearable property', function() {
            expect(craftedItem.isWearable).to.not.be.equal(undefined);
        });
    })

    describe('craftMany()', function() {
        const numberOfItemsToCraft = 5;
        const craftedManyItems = Forge.craftMany(numberOfItemsToCraft);

        it('should return an array', function() {
            expect(Array.isArray(craftedManyItems)).to.be.equal(true)
        })

        it('should return as many items, as set in it\'s argument', function() {
            expect(craftedManyItems.length).to.be.equal(numberOfItemsToCraft);
        })
    })

    describe('get nextItemId', function() {
        const currentNextItemId = Forge.nextItemId;
        const expectedNextItemItAfterCraft = currentNextItemId + 1;

        it('should be a positive integer', function() {
            expect(currentNextItemId).to.be.above(0);
            expect(Number.isInteger(currentNextItemId)).to.be.equal(true);
        })

        it('should increase after crafting an item', function() {
            Forge.craft();
            expect(Forge.nextItemId).to.be.equal(expectedNextItemItAfterCraft)
        })
    })
});