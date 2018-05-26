import Forge from 'classes/Forge';

describe.skip('Forge', function () {

    describe('General', function() {
        it('should has gettable mastery level which is a number', function() {
            expect(Forge.mastery).to.be.a('number');
        }) 
    })

    describe('craft()', function () {
        const craftedItem = Forge.craft();
        console.log(craftedItem)

        it('should be an object', function() {
            expect(craftedItem).to.be.an('object');
        });

        it('should has isWearable property', function() {
        	expect(craftedItem).to.has.property('isWearable');
        });

        it('should has a rank property', function() {
            expect(craftedItem).to.has.property('rank');
        });

        it('should has a type property', function() {
            expect(craftedItem).to.has.property('type');
        });
    })

    describe('craftMany()', function() {
        const numberOfItemsToCraft = 5;
        const craftedItems = Forge.craftMany(numberOfItemsToCraft);

        it('should return an array', function() {
          expect(craftedItems).to.be.an('array');
        })

        it('should return as many items, as set in it\'s argument', function() {
        	expect(craftedItems).to.have.lengthOf(numberOfItemsToCraft);
        })
    })

    describe('get nextItemId', function() {
        const currentNextItemId = Forge.nextItemId;
        const expectedNextItemItAfterCraft = currentNextItemId + 1;

        it('should be a positive integer', function() {
            expect(currentNextItemId).to.be.above(0);
            expect(Number.isInteger(currentNextItemId)).to.be.equal(true);
        })

        it('should increase after crafting a new item', function() {
            Forge.craft();
            const newItemId = Forge.nextItemId
            expect(newItemId).to.be.equal(expectedNextItemItAfterCraft)
        })
    })
});