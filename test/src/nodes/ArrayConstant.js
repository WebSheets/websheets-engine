import assert from 'assert';

import compiler from '../../../src';


describe('ArrayConstant', () => {
    it('should support horizontal arrays', () => {
        assert.strictEqual(compiler('sum({1,2,3})').run(null), 6);
    });
    it('should support vertical arrays', () => {
        assert.strictEqual(compiler('sum({1;2;3})').run(null), 6);
    });
    it('should support 2d arrays', () => {
        assert.strictEqual(compiler('sum({1,1,1;2,2,2;3,3,3})').run(null), 18);
    });

    it('should return arrays', () => {
        const output = compiler('{1,2;3,4}').run(null);
        assert.ok(Array.isArray(output));
        assert.ok(Array.isArray(output[0]));
        assert.strictEqual(output[0][0], 1);
        assert.strictEqual(output[0][1], 2);
        assert.strictEqual(output[1][0], 3);
        assert.strictEqual(output[1][1], 4);
    });
});
