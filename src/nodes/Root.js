import BaseNode from './BaseNode';
import {flattenCellReferences} from '../functions';


export default class Root extends BaseNode {
    constructor(base) {
        super();
        this.base = base;
    }
    clone() {
        return new Root(this.base.clone());
    }
    run(sheet) {
        const output = this.base.run(sheet);
        return flattenCellReferences(output);
    }
    shallowWalk(cb) {
        cb(this.base);
    }
    toString() {
        return this.base.toString();
    }
};
