import assert from 'assert';

import compiler from '../../../src';


describe('BinopSub', () => {
    it('should support subtracting numbers', () => {
        assert.equal(compiler('2-3').run(null), -1);
    });
    it('should support subtracting numbers of different types', () => {
        assert.equal(compiler('2-1.5').run(null), 0.5);
    });
    it('should support subtracting numbers and strings', () => {
        assert.equal(compiler('2-"2"').run(null), 0);
    });
    it('should support subtracting two arrays', () => {
        assert.equal(compiler('sum({2,4,8}-{1,2,2})').run(null), 9);
    });
    it('should support subtracting an array and a number', () => {
        assert.equal(compiler('sum({0,1,2}-2)').run(null), -3);
    });
    it('should support subtracting a number and an array', () => {
        assert.equal(compiler('sum(10-{1,2,5})').run(null), 22);
    });
});
