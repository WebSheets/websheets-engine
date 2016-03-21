import BaseNode from './BaseNode';
import {parseNumAlways} from '../functions';


export default class UnaryPlus extends BaseNode {
    constructor(base) {
        super();
        this.base = base;
    }
    clone() {
        return new UnaryPlus(
            this.base.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.base);
    }
    run(sheet) {
        return parseNumAlways(this.base.run(sheet));
    }
    toString() {
        return `+${this.base}`;
    }
};
