import assert from 'assert';

import compiler from '../../../src';


describe('UnaryPlus', () => {
    it('should support operating on numbers', () => {
        assert.strictEqual(compiler('+(1)').run(null), 1);
        assert.strictEqual(compiler('+(-1)').run(null), -1);
    });
    it('should support operating on strings', () => {
        assert.strictEqual(compiler('+("1")').run(null), 1);
        assert.strictEqual(compiler('+("-1")').run(null), -1);
    });
    it('should support operating on arrays', () => {
        assert.strictEqual(compiler('sum(+{1,2})').run(null), 3);
    });
});
