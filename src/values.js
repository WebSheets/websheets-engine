import {adjustCellID, getCellPos} from './cellID';


export class CellReference {
    constructor(cellID, sheet) {
        this.cellID = cellID;
        this.sheet = sheet;
    }

    run() {
        return this.sheet.getCalculatedValueAtID(this.cellID);
    }

    adjust(deltaRow, deltaCol, height = 1, width = 1, forceRange = false) {
        const {cellID, rawCellID} = adjustCellID(
            this.cellID,
            deltaRow,
            deltaCol,
            this.pinRow,
            this.pinCol
        );
        if (height !== 1 || width !== 1 || forceRange) {
            const {cellID: endCellID} = adjustCellID(cellID, height - 1, width - 1);
            return new CellRange(cellID, endCellID, this.sheet);
        } else {
            return new CellReference(cellID, this.sheet);
        }
    }

    toString() {
        return this.cellID;
    }
};

export class CellRange extends CellReference {
    constructor(cellID, endCellID, sheet) {
        super(cellID, sheet);
        this.endCellID = endCellID;

        const {row: startRow, col: startCol} = getCellPos(cellID);
        const {row: endRow, col: endCol} = getCellPos(endCellID);

        this.width = Math.abs(endCol - startCol);
        this.height = Math.abs(endRow - startRow);
    }

    run() {
        const startPos = getCellPos(this.cellID);
        const endPos = getCellPos(this.endCellID);

        const rowStart = Math.min(startPos.row, endPos.row);
        const rowEnd = Math.max(startPos.row, endPos.row);
        const colStart = Math.min(startPos.col, endPos.col);
        const colEnd = Math.max(startPos.col, endPos.col);

        const results = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            const row = [];
            for (let j = colStart; j <= colEnd; j++) {
                row.push(this.sheet.getCalculatedValueAtPos(i, j));
            }
            results.push(row);
        }
        return results;
    }

    adjust(deltaRow, deltaCol, height = this.height, width = this.width) {
        super.adjust(deltaRow, deltaCol, height, width, true);
    }

    toString() {
        return `${this.cellID}:${this.endCellID}`;
    }
};
