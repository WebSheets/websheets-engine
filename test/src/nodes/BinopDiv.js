import assert from 'assert';

import compiler from '../../../src';


describe('BinopDiv', () => {
    it('should support dividing numbers', () => {
        assert.strictEqual(compiler('1/2').run(null), 0.5);
    });
    it('should support dividing numbers of different types', () => {
        assert.strictEqual(compiler('1.4/2').run(null), 0.7);
    });
    it('should support dividing numbers and strings', () => {
        assert.strictEqual(compiler('1/"2"').run(null), 0.5);
    });
    it('should support dividing two arrays', () => {
        assert.strictEqual(compiler('sum({2,4,8}/{4,8,16})').run(null), 1.5);
    });
    it('should support dividing an array and a number', () => {
        assert.strictEqual(compiler('sum({0,1,2}/1)').run(null), 3);
    });
    it('should support dividing a number and an array', () => {
        assert.strictEqual(compiler('sum(10/{1,2,5})').run(null), 17);
    });
});
