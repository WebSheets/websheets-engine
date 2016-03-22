import assert from 'assert';

import compiler from '../../../src';


describe('BinopAdd', () => {
    it('should support adding numbers', () => {
        assert.equal(compiler('1+2').run(null), 3);
    });
    it('should support adding numbers of different types', () => {
        assert.equal(compiler('1.4+2').run(null), 3.4);
    });
    it('should support adding numbers and strings', () => {
        assert.equal(compiler('1+"2"').run(null), 3);
    });
    it('should support adding two arrays', () => {
        assert.equal(compiler('sum({0,2,0}+{1,0,3})').run(null), 6);
    });
    it('should support adding an array and a number', () => {
        assert.equal(compiler('sum({0,1,2}+1)').run(null), 6);
    });
    it('should support adding a number and an array', () => {
        assert.equal(compiler('sum(1+{0,1,2})').run(null), 6);
    });
});
