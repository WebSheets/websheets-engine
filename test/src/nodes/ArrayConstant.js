import assert from 'assert';

import compiler from '../../src';


describe('ArrayConstant', () => {
    it('should support horizontal arrays', () => {
        assert.equal(compiler('sum({1,2,3})').run(null), 6);
    });
    it('should support vertical arrays', () => {
        assert.equal(compiler('sum({1;2;3})').run(null), 6);
    });
    it('should support 2d arrays', () => {
        assert.equal(compiler('sum({1,1,1;2,2,2;3,3,3})').run(null), 18);
    });

    it('should return arrays', () => {
        const output = compiler('{1,2;3,4}').run(null);
        assert.ok(Array.isArray(output));
        assert.ok(Array.isArray(output[0]));
        assert.equal(output[0][0], 1);
        assert.equal(output[0][1], 2);
        assert.equal(output[1][0], 3);
        assert.equal(output[1][1], 4);
    });
});
