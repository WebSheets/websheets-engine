import {TOKEN_CELL_ID} from './index';


export function getCellID(row, column) {
    let base = '';

    row += 1;
    column += 1;

    do {
        column -= 1;
        const character = column % 26;
        column -= character;
        column /= 26;
        base = String.fromCharCode(character + 65) + base;
    } while (column);

    return base + row;
};

var cellPosCache = {};
export function getCellPos(id) {
    id = id.toUpperCase();
    if (id in cellPosCache) return cellPosCache[id];

    const matches = /^([a-z]+)([0-9]+)$/i.exec(id);
    let charBit = matches[1];
    let col = 0;
    while (charBit) {
        const character = charBit.charCodeAt(0) - 64;
        col *= 26;
        col += character;
        charBit = charBit.substr(1);
    }
    col -= 1;

    const output = new CellPosition(col, matches[2] - 1);
    cellPosCache[id] = output;
    return output;
};

class CellPosition {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
}


export function adjustCellID(cellID, deltaRow, deltaCol, pinRow = false, pinCol = false) {
    const pos = getCellPos(cellID);
    const row = pos.row + (pinRow ? 0 : deltaRow);
    const col = pos.col + (pinCol ? 0 : deltaCol);
    const newCellID = getCellID(row, col);
    const rematched = TOKEN_CELL_ID.exec(newCellID);
    const rawID = (pinCol ? '$' : '') + rematched[2] + (pinRow ? '$' : '') + rematched[4];

    return {cellID: newCellID, rawCellID: rawID};
};
