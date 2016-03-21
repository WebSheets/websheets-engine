import BaseNode from './BaseNode';
import execFunc from '../functions';


export default class Function_ extends BaseNode {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args;
    }
    clone() {
        return new Function_(
            this.name,
            this.args.map(arg => arg.clone())
        );
    }
    run(sheet) {
        return execFunc(
            this.name.toUpperCase(),
            this.args.map(arg => arg.run(sheet)),
            sheet
        );
    }
    toString() {
        return `${this.name}(${this.args.map(a => a.toString()).join(', ')})`;
    }
};
