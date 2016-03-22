import BaseNode from './BaseNode';
import {parseNumAlways} from '../functions';


export default class BaseBinopNode extends BaseNode {
    run(sheet) {
        const left = this.left.run(sheet);
        const right = this.right.run(sheet);

        const handleValues = (leftVal, rightVal) => {
            const leftIsArray = Array.isArray(leftVal);
            const rightIsArray = Array.isArray(rightVal);

            if (leftIsArray && rightIsArray) {
                const output = [];
                const maxSize = Math.max(leftVal.length, rightVal.length);
                for (let i = 0; i < maxSize; i++) {
                    output.push(handleValues(leftVal[i], rightVal[i]));
                }
                return output;
            }

            const parsedLeft = parseNumAlways(leftVal);
            const parsedRight = parseNumAlways(rightVal);

            if (leftIsArray) {
                return leftVal.map(item => handleValues(item, parsedRight));
            }
            if (rightIsArray) {
                return rightVal.map(item => handleValues(parsedLeft, item));
            }

            return this.runNumericOperation(parsedLeft, parsedRight);
        };

        return handleValues(left, right);
    }

};
