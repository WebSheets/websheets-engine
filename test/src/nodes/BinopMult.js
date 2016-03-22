import assert from 'assert';

import compiler from '../../../src';


describe('BinopMult', () => {
    it('should support multiplying numbers', () => {
        assert.equal(compiler('2*3').run(null), 6);
    });
    it('should support multiplying numbers of different types', () => {
        assert.equal(compiler('2*1.5').run(null), 3);
    });
    it('should support multiplying numbers and strings', () => {
        assert.equal(compiler('2*"2"').run(null), 4);
    });
    it('should support multiplying two arrays', () => {
        assert.equal(compiler('sum({2,4,8}*{1,2,2})').run(null), 26);
    });
    it('should support multiplying an array and a number', () => {
        assert.equal(compiler('sum({0,1,2}*2)').run(null), 6);
    });
    it('should support multiplying a number and an array', () => {
        assert.equal(compiler('sum(10*{1,2,5})').run(null), 80);
    });
});
