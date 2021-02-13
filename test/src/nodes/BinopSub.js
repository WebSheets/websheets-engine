import assert from 'assert';

import compiler from '../../../src';


describe('BinopSub', () => {
    it('should support subtracting numbers', () => {
        assert.strictEqual(compiler('2-3').run(null), -1);
    });
    it('should support subtracting numbers of different types', () => {
        assert.strictEqual(compiler('2-1.5').run(null), 0.5);
    });
    it('should support subtracting numbers and strings', () => {
        assert.strictEqual(compiler('2-"2"').run(null), 0);
    });
    it('should support subtracting two arrays', () => {
        assert.strictEqual(compiler('sum({2,4,8}-{1,2,2})').run(null), 9);
    });
    it('should support subtracting an array and a number', () => {
        assert.strictEqual(compiler('sum({0,1,2}-2)').run(null), -3);
    });
    it('should support subtracting a number and an array', () => {
        assert.strictEqual(compiler('sum(10-{1,2,5})').run(null), 22);
    });
});
