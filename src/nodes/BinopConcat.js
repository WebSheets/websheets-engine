import BaseNode from './BaseNode';
import {parseNumAlways} from '../functions';


export default class BinopConcat extends BaseNode {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    clone() {
        return new BinopConcat(
            this.left.clone(),
            this.right.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.left);
        cb(this.right);
    }
    run(sheet) {
        const left = this.left.run(sheet);
        if (left instanceof Error) {
            return left;
        }
        const right = this.right.run(sheet);
        if (right instanceof Error) {
            return right;
        }

        // TODO: Handle arrays

        return left.toString() + right.toString();

    }
    toString() {
        return `(${this.left} & ${this.right})`;
    }
};
