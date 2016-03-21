import BaseNode from './BaseNode';


export default class LiteralBoolean extends BaseNode {
    constructor(value) {
        super();
        this.value = value;
    }
    clone() {
        return new LiteralBoolean(this.value);
    }
    run() {
        return this.value;
    }
    toString() {
        return this.value ? 'true' : 'false';
    }
};
