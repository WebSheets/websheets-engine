import BaseNode from './BaseNode';


export default class LiteralString extends BaseNode {
    constructor(value) {
        super();
        this.value = value;
    }
    clone() {
        return new LiteralString(this.value);
    }
    run() {
        return this.value.toString();
    }
    toString() {
        return JSON.stringify(this.value);
    }
};
