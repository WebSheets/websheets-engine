import assert from 'assert';

import compiler from '../../../src';


describe('UnaryMinus', () => {
    it('should support negating numbers', () => {
        assert.strictEqual(compiler('-(1)').run(null), -1);
        assert.strictEqual(compiler('-(-1)').run(null), 1);
    });
    it('should support negating strings', () => {
        assert.strictEqual(compiler('-("1")').run(null), -1);
        assert.strictEqual(compiler('-("-1")').run(null), 1);
    });
    it('should support negating arrays', () => {
        assert.strictEqual(compiler('sum(-{1,2})').run(null), -3);
    });
});
