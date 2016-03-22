import * as formulajs from 'formulajs';

import {CellReference} from './values';


const directExprFuncs = {
    AND: (...args) => args.every(parseNumAlways),
    ISBLANK: x => x === '' || x === null,
    NOT: x => !parseNumAlways(x),
    OR: (...args) => args.some(parseNumAlways),
    PI: () => Math.PI,

    OFFSET: (cellRef, deltaRow = 0, deltaCol = 0, height = 1, width = 1) => {
        if (!(cellRef instanceof CellReference)) {
            throw new Error('OFFSET() called with a non-cell reference');
        }

        return cellRef.adjust(deltaRow, deltaCol, height, width);
    },
};

for (let key in formulajs) {
    if (typeof formulajs[key] !== 'function') {
        continue;
    }
    if (key in directExprFuncs) {
        continue;
    }
    directExprFuncs[key.toUpperCase()] = formulajs[key];
}


export default function execFunc(name, args) {
    if (name === 'OFFSET') {
        return directExprFuncs.OFFSET(...args);
    }
    if (!(name in directExprFuncs)) {
        throw new Error('#NAME?');
    }

    const flattenedArgs = flattenCellReferences(args);
    return directExprFuncs[name](...flattenedArgs);
};

export function flattenCellReferences(args) {
    if (args instanceof CellReference) {
        return flattenCellReferences(args.run());
    }
    if (!Array.isArray(args)) {
        return args;
    }
    return args.map(arg => {
        if (arg instanceof CellReference) {
            return flattenCellReferences(arg.run());
        }
        if (Array.isArray(arg)) {
            return flattenCellReferences(arg);
        }
        return arg;
    });
};


export function parseNumAlways(value) {
    if (value === true) {
        return 1;
    } else if (value === false) {
        return 0;
    }
    if (value instanceof CellReference) {
        return parseNumAlways(value.run());
    }

    // In excel, `+{1,2;3,4}` equals `1`.
    if (Array.isArray(value)) {
        return parseNumAlways(value[0]);
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? (value ? 1 : 0) : parsed;
};
