import BaseBinop from './BaseBinop';


export default class BinopExpon extends BaseBinop {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    clone() {
        return new BinopExpon(
            this.left.clone(),
            this.right.clone()
        );
    }
    shallowWalk(cb) {
        cb(this.left);
        cb(this.right);
    }
    runNumericOperation(left, right) {
        return Math.pow(left, right);
    }
    toString() {
        return `(${this.left} ^ ${this.right})`;
    }
};
