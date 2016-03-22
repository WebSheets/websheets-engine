import assert from 'assert';

import compiler from '../../../src';


describe('BinopExpon', () => {
    it('should support raising numbers', () => {
        assert.equal(compiler('2^3').run(null), 8);
    });
    it('should support raising numbers of different types', () => {
        assert.equal(compiler('2^1.5').run(null), 2.8284271247461903);
    });
    it('should support raising numbers and strings', () => {
        assert.equal(compiler('2^"2"').run(null), 4);
    });
    it('should support raising two arrays', () => {
        assert.equal(compiler('sum({2,4,8}^{1,2,2})').run(null), 82);
    });
    it('should support raising an array and a number', () => {
        assert.equal(compiler('sum({0,1,2}^2)').run(null), 5);
    });
    it('should support raising a number and an array', () => {
        assert.equal(compiler('sum(10^{1,2,5})').run(null), 100110);
    });
});
