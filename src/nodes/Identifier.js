import BaseNode from './BaseNode';
import {CellReference} from '../values';
import {adjustCellID} from '../cellID';


export default class Identifier extends BaseNode {
    constructor(value, pinRow, pinCol, raw) {
        super();
        this.value = value;
        this.pinRow = pinRow;
        this.pinCol = pinCol;
        this.raw = raw;
    }
    adjust(deltaRow, deltaCol) {
        const {cellID, rawCellID} = adjustCellID(
            this.value,
            deltaRow,
            deltaCol,
            this.pinRow,
            this.pinCol
        );
        this.value = cellID;
        this.raw = rawCellID;
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
        return new CellReference(this.value, sheet);
    }
    toString() {
        return this.raw.toUpperCase();
    }
};
