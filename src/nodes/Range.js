import BaseNode from './BaseNode';
import {CellRange} from '../values';


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
        return new CellRange(this.start.value, this.end.value, sheet);
    }
    toString() {
        return `${this.start}:${this.end}`;
    }
};
