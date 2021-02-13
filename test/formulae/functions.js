import assert from 'assert';

import compiler from '../../src';

import {Runner} from './_utils.js';


describe('Functions', () => {
    it('should be available from formula.js', () => {
        assert.strictEqual(compiler('AVERAGE(2,3,4)').run(null), 3);
        assert.strictEqual(compiler('SUM(4,5)').run(null), 9);
    });
    it('and()', () => {
        const r = new Runner({A1: 1, A2: 1, A3: 0});
        assert.strictEqual(compiler('AND(A1, A2)').run(r), true);
        assert.strictEqual(compiler('AND(A1, A2, A3)').run(r), false);
        assert.strictEqual(compiler('AND(1,2,3)').run(r), true);
        assert.strictEqual(compiler('AND("foo", 0)').run(r), false);
        assert.strictEqual(compiler('AND("foo")').run(r), true);
    });
    it('isblank()', () => {
        const r = new Runner({A1: null, A2: '', A3: 0});
        assert.strictEqual(compiler('ISBLANK(A1)').run(r), true);
        assert.strictEqual(compiler('ISBLANK(A2)').run(r), true);
        assert.strictEqual(compiler('ISBLANK(A3)').run(r), false);
        assert.strictEqual(compiler('ISBLANK("")').run(r), true);
        assert.strictEqual(compiler('ISBLANK("foo")').run(r), false);
    });
    it('not()', () => {
        const r = new Runner({A1: null});
        assert.strictEqual(compiler('NOT(1)').run(r), false);
        assert.strictEqual(compiler('NOT(0)').run(r), true);
        assert.strictEqual(compiler('NOT(false)').run(r), true);
        assert.strictEqual(compiler('NOT(true)').run(r), false);
        assert.strictEqual(compiler('NOT(10)').run(r), false);
    });
    it('or()', () => {
        const r = new Runner({A1: 1, A2: 1, A3: 0});
        assert.strictEqual(compiler('OR(A1, A2)').run(r), true);
        assert.strictEqual(compiler('OR(A1, A2, A3)').run(r), true);
        assert.strictEqual(compiler('OR(1,2,3)').run(r), true);
        assert.strictEqual(compiler('OR("foo", 0)').run(r), true);
        assert.strictEqual(compiler('OR("foo")').run(r), true);
        assert.strictEqual(compiler('OR(A3)').run(r), false);
        assert.strictEqual(compiler('OR(0,0,0)').run(r), false);
    });
    it('pi()', () => {
        assert.strictEqual(compiler('PI()').run(null), Math.PI);
    });

    describe('offset()', () => {
        it('should adjust cell references', () => {
            const r = new Runner({A1: 1, A2: 2, B1: 3, B2: 4});
            assert.strictEqual(compiler('offset(a1, 1, 0)').run(r), 2);
            assert.strictEqual(compiler('offset(b1, 1, 0)').run(r), 4);
        });
        it('should adjust sizes', () => {
            const r = new Runner({A1: 1, A2: 2, B1: 3, B2: 4});
            assert.strictEqual(compiler('sum(offset(a1, 0, 0, 2, 2))').run(r), 10);
        });
    });

});
