import assert from 'assert';

import compiler from '../../../src';


describe('BinopAdd', () => {
    it('should support adding numbers', () => {
        assert.strictEqual(compiler('1+2').run(null), 3);
    });
    it('should support adding numbers of different types', () => {
        assert.strictEqual(compiler('1.4+2').run(null), 3.4);
    });
    it('should support adding numbers and strings', () => {
        assert.strictEqual(compiler('1+"2"').run(null), 3);
    });
    it('should support adding two arrays', () => {
        assert.strictEqual(compiler('sum({0,2,0}+{1,0,3})').run(null), 6);
    });
    it('should support adding an array and a number', () => {
        assert.strictEqual(compiler('sum({0,1,2}+1)').run(null), 6);
    });
    it('should support adding a number and an array', () => {
        assert.strictEqual(compiler('sum(1+{0,1,2})').run(null), 6);
    });
});
