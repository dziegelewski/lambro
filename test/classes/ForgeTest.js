import Forge from 'classes/Forge';

const forge = new Forge(3);

describe('Forge', function () {
    describe('General', function() {
        it('should has gettable mastery level which is a number', function() {
            expect(forge.mastery).to.be.a('number');
        }) 
    })

    describe('craft()', function () {
        const craftedItem = forge.craft();

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
        const craftedItems = forge.craftMany(numberOfItemsToCraft);

        it('should return an array', function() {
          expect(craftedItems).to.be.an('array');
        })

        it('should return as many items, as set in it\'s argument', function() {
        	expect(craftedItems).to.have.lengthOf(numberOfItemsToCraft);
        })
    })
});