import {
	plus,
	minus,
	min,
} from 'utils/functional';

describe('functional', () => {
	describe('plus', () => {
		it('returns a function that increases given value', () => {
			const plus4 = plus(4);
			expect(plus4(10)).to.be.equal(14);
		})
	});

	describe('minus', () => {
		it('returns a function that decreases given value', () => {
			const minus4 = minus(4);
			expect(minus4(10)).to.be.equal(6);
		})
	});

	describe('notBiggerThan', () => {
		it('is curried Math.min', () => {
			const notBiggerThan10 = notBiggerThan(10);
			expect(notBiggerThan10(12)).to.be.equal(10);
			expect(notBiggerThan10(8)).to.be.equal(8);
		})
	});

	describe('toPowerOf', () => {
		it('is curred Math.pow', () => {
			const toPowerOf4 = toPowerOf(4);

			expect(toPowerOf4(2)).to.be.equal(16);
		})
	});


});
