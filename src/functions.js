import * as formulajs from 'formulajs';


const directExprFuncs = {
    AND: (...args) => args.every(parseNumAlways),
    ISBLANK: x => x === '' || x === null,
    NOT: x => !parseNumAlways(x),
    OR: (...args) => args.some(parseNumAlways),
    PI: () => Math.PI,
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


export default function execFunc(name, args, sheet) {
    if (!(name in directExprFuncs)) {
        throw new Error('#NAME?');
    }
    return directExprFuncs[name](...args);
};


export function parseNumAlways(value) {
    if (value === true) {
        return 1;
    } else if (value === false) {
        return 0;
    }

    // In excel, `+{1,2;3,4}` equals `1`.
    if (Array.isArray(value)) {
        return parseNumAlways(value[0]);
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? (value ? 1 : 0) : parsed;
};
