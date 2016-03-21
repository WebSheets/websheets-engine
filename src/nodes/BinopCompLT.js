import BaseNode from './BaseNode';
import {parseNumAlways} from '../functions';


export default class BinopCompLT extends BaseNode {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    clone() {
        return new BinopCompLT(
            this.left.clone(),
            this.right.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.left);
        cb(this.right);
    }
    run(sheet) {
        return parseNumAlways(this.left.run(sheet)) < parseNumAlways(this.right.run(sheet));
    }
    toString() {
        return `(${this.left} < ${this.right})`;
    }
};
