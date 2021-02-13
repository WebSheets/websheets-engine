import assert from 'assert';

import compiler from '../../../src';


describe('BinopMult', () => {
    it('should support multiplying numbers', () => {
        assert.strictEqual(compiler('2*3').run(null), 6);
    });
    it('should support multiplying numbers of different types', () => {
        assert.strictEqual(compiler('2*1.5').run(null), 3);
    });
    it('should support multiplying numbers and strings', () => {
        assert.strictEqual(compiler('2*"2"').run(null), 4);
    });
    it('should support multiplying two arrays', () => {
        assert.strictEqual(compiler('sum({2,4,8}*{1,2,2})').run(null), 26);
    });
    it('should support multiplying an array and a number', () => {
        assert.strictEqual(compiler('sum({0,1,2}*2)').run(null), 6);
    });
    it('should support multiplying a number and an array', () => {
        assert.strictEqual(compiler('sum(10*{1,2,5})').run(null), 80);
    });
});
