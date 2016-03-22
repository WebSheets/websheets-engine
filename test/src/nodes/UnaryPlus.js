import assert from 'assert';

import compiler from '../../../src';


describe('UnaryPlus', () => {
    it('should support operating on numbers', () => {
        assert.equal(compiler('+(1)').run(null), 1);
        assert.equal(compiler('+(-1)').run(null), -1);
    });
    it('should support operating on strings', () => {
        assert.equal(compiler('+("1")').run(null), 1);
        assert.equal(compiler('+("-1")').run(null), -1);
    });
    it('should support operating on arrays', () => {
        assert.equal(compiler('sum(+{1,2})').run(null), 3);
    });
});
