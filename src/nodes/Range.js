import BaseNode from './BaseNode';
import {getCellPos} from '../cellID';
import {parseNumAlways} from '../functions';


export default class Range extends BaseNode {
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }
    clone() {
        return new Range(
            this.start.clone(),
            this.end.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.start);
        cb(this.end);
    }
    run(sheet) {
        const startPos = getCellPos(this.start.value);
        const endPos = getCellPos(this.end.value);

        const rowStart = Math.min(startPos.row, endPos.row);
        const rowEnd = Math.max(startPos.row, endPos.row);
        const colStart = Math.min(startPos.col, endPos.col);
        const colEnd = Math.max(startPos.col, endPos.col);

        const results = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            const row = [];
            for (let j = colStart; j <= colEnd; j++) {
                row.push(sheet.getCalculatedValueAtPos(i, j));
            }
            results.push(row);
        }
        return results;
    }
    toString() {
        return `${this.start}:${this.end}`;
    }
};
