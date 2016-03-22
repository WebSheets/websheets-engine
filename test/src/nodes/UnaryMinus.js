import assert from 'assert';

import compiler from '../../../src';


describe('UnaryMinus', () => {
    it('should support negating numbers', () => {
        assert.equal(compiler('-(1)').run(null), -1);
        assert.equal(compiler('-(-1)').run(null), 1);
    });
    it('should support negating strings', () => {
        assert.equal(compiler('-("1")').run(null), -1);
        assert.equal(compiler('-("-1")').run(null), 1);
    });
    it('should support negating arrays', () => {
        assert.equal(compiler('sum(-{1,2})').run(null), -3);
    });
});
