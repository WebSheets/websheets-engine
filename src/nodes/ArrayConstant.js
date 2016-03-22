import BaseNode from './BaseNode';


export default class ArrayConstant extends BaseNode {
    constructor(body) {
        super();
        this.body = body;
    }
    clone() {
        return new ArrayConstant(
            this.body.map(
                row => row.map(cell => cell.clone())
            )
        );
    }
    shallowWalk(cb) {
        for (let i = 0; i < this.body.length; i++) {
            for (let j = 0; j < this.body[i].length; j++) {
                cb(this.body[i][j]);
            }
        }
    }
    run(sheet) {
        return this.body.map(
            row => row.map(cell => cell.run(sheet))
        );
    }
    toString() {
        return '{' +
            this.body.map(
                row => row.map(x => x.toString()).join(',')
            ).join(';') +
            '}';
    }
};
