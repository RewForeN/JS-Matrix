let assert = require('assert');
let { Assert } = require('../src/assert');

describe('Assert', function () {
    describe('#integer()', function () {
        it('should throw a TypeError if value is not an integer', function () {
            assert.throws(() => { Assert.integer(undefined, 'Test') }, TypeError);
            assert.throws(() => { Assert.integer(null, 'Test') }, TypeError);
            assert.throws(() => { Assert.integer('1', 'Test') }, TypeError);
            assert.throws(() => { Assert.integer([1], 'Test') }, TypeError);
            assert.throws(() => { Assert.integer(0.95, 'Test') }, TypeError);
            assert.doesNotThrow(() => { Assert.integer(0, 'Test') }, TypeError);
        });
    });
    describe('#integerMin()', function () {
        it('should throw a RangeError if value is less than minimum', function () {
            assert.throws(() => { Assert.integerMin(0, 1, 'Test') }, RangeError);
            assert.doesNotThrow(() => { Assert.integerMin(1, 1, 'Test') }, RangeError);
            assert.doesNotThrow(() => { Assert.integerMin(1, 0, 'Test') }, RangeError);
        });
    });
    describe('#integerMax()', function () {
        it('should throw a RangeError if value is greater than maximum', function () {
            assert.throws(() => { Assert.integerMax(1, 0, 'Test') }, RangeError);
            assert.doesNotThrow(() => { Assert.integerMax(1, 1, 'Test') }, RangeError);
            assert.doesNotThrow(() => { Assert.integerMax(0, 1, 'Test') }, RangeError);
        });
    });
});
