
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
