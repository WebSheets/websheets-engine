import assert from 'assert';

import compiler from '../../../src';


describe('BinopExpon', () => {
    it('should support raising numbers', () => {
        assert.strictEqual(compiler('2^3').run(null), 8);
    });
    it('should support raising numbers of different types', () => {
        assert.strictEqual(compiler('2^1.5').run(null), 2.82842712474619);
    });
    it('should support raising numbers and strings', () => {
        assert.strictEqual(compiler('2^"2"').run(null), 4);
    });
    it('should support raising two arrays', () => {
        assert.strictEqual(compiler('sum({2,4,8}^{1,2,2})').run(null), 82);
    });
    it('should support raising an array and a number', () => {
        assert.strictEqual(compiler('sum({0,1,2}^2)').run(null), 5);
    });
    it('should support raising a number and an array', () => {
        assert.strictEqual(compiler('sum(10^{1,2,5})').run(null), 100110);
    });
});
