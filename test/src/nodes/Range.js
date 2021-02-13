import assert from 'assert';

import compiler from '../../../src';


describe('Range', () => {
    it('should be adjusted properly', () => {
        const out = compiler('A1:A1');
        out.adjust(1, 1);
        assert.strictEqual(out.toString(), 'B2:B2');
    });
});
