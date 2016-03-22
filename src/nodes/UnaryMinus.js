import BaseNode from './BaseNode';
import {parseNumAlways} from '../functions';


export default class UnaryMinus extends BaseNode {
    constructor(base) {
        super();
        this.base = base;
    }
    clone() {
        return new UnaryMinus(
            this.base.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.base);
    }
    run(sheet) {
        const makeNeg = val => {
            if (Array.isArray(val)) {
                return val.map(makeNeg);
            }
            return -1 * parseNumAlways(val);
        };
        return makeNeg(this.base.run(sheet));
    }
    toString() {
        return `-${this.base}`;
    }
};
