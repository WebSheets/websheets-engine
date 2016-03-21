import BaseNode from './BaseNode';
import {getCellID, getCellPos} from '../cellID';
import {TOKEN_CELL_ID} from '../index';


export default class Identifier extends BaseNode {
    constructor(value, pinRow, pinCol, raw) {
        super();
        this.value = value;
        this.pinRow = pinRow;
        this.pinCol = pinCol;
        this.raw = raw;
    }
    adjust(deltaRow, deltaCol) {
        const pos = getCellPos(this.value);
        const row = pos.row + (this.pinRow ? 0 : deltaRow);
        const col = pos.col + (this.pinCol ? 0 : deltaCol);
        this.value = getCellID(row, col);
        const rematched = TOKEN_CELL_ID.exec(this.value);
        this.raw = (this.pinCol ? '$' : '') + rematched[2] + (this.pinRow ? '$' : '') + rematched[4];
    }
    findCellDependencies(cb) {
        cb(this.value);
    }
    clone() {
        return new Identifier(
            this.value,
            this.pinRow,
            this.pinCol,
            this.raw
        );
    }
    run(sheet) {
        return sheet.getCalculatedValueAtID(this.value);
    }
    toString() {
        return this.raw.toUpperCase();
    }
};
