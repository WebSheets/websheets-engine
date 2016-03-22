import assert from 'assert';

import {getCellID, getCellPos} from '../../src/cellID';


describe('getCellID', () => {
    [
        [0, 0, 'A1'],
        [1, 0, 'A2'],
        [0, 1, 'B1'],
        [1, 1, 'B2'],
        [0, 25, 'Z1'],
        [0, 26, 'AA1'],
        [0, 27, 'AB1'],
        [0, 52, 'BA1'],
    ].forEach(([row, col, expected]) => {
        it(`should map row ${row} col ${col} to ${expected}`, () => {
            assert.equal(getCellID(row, col), expected);
        });
    });
});

describe('getCellPos', () => {
    [
        ['a1', 0, 0],
        ['b1', 0, 1],
        ['a2', 1, 0],
        ['b2', 1, 1],
        ['z1', 0, 25],
        ['aa1', 0, 26],
        ['ab1', 0, 27],
        ['ba1', 0, 52],
    ].forEach(([id, expectedRow, expectedCol]) => {
        it(`should map ${id} to row ${expectedRow} col ${expectedCol}`, () => {
            const {row, col} = getCellPos(id);
            assert.equal(row, expectedRow, 'Expected row to match');
            assert.equal(col, expectedCol, 'Expected col to match');
        });
    });
});
