import assert from 'assert';

import compiler from '../../../src';


describe('Identifier', () => {
    it('should be adjusted properly', () => {
        const out = compiler('A1');
        out.adjust(1, 1);
        assert.strictEqual(out.toString(), 'B2');
    });
    it('should be adjusted properly with row pinning', () => {
        const out = compiler('A$1');
        out.adjust(1, 1);
        assert.strictEqual(out.toString(), 'B$1');
    });
    it('should be adjusted properly with col pinning', () => {
        const out = compiler('$A1');
        out.adjust(1, 1);
        assert.strictEqual(out.toString(), '$A2');
    });
});
