import BaseNode from './BaseNode';


export default class LiteralNumber extends BaseNode {
    constructor(value, raw) {
        super();
        this.value = value;
        this.raw = raw;
    }
    clone() {
        return new LiteralNumber(this.value);
    }
    run() {
        return this.value;
    }
    toString() {
        return this.raw.toString();
    }
};
