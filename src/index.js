import ExpressionToken from './ExpressionToken';
import * as nodes from './nodes';
import {getCellID, getCellPos} from './cellID';


export const TOKEN_BOOL = /^(true|false)/i;
export const TOKEN_STRING = /^"([^\\]|\\.)*"/i;
export const TOKEN_CELL_ID = /^(\$?)(\w+)(\$?)(\d+)/i;
export const TOKEN_NUM = /^((([1-9][0-9]*\.|0\.)[0-9]+)|([1-9][0-9]*)|0)/;
export const TOKEN_BINOP_TIMES = /^(\/|\*)/;
export const TOKEN_BINOP_EXP = /^(\^)/;
export const TOKEN_BINOP_ADD = /^(\+|\-|&)/;
export const TOKEN_BINOP_COMP = /^(<>|=|>=|<=|<|>)/;
export const TOKEN_FOPEN = /^(\w+)\(/;
export const TOKEN_XSOPEN = /^(\w+)!/;
export const TOKEN_RPAREN = /^\)/;
export const TOKEN_LPAREN = /^\(/;
export const TOKEN_COMMA = /^,/;
export const TOKEN_COLON = /^:/;
export const TOKEN_PERCENT = /^%/;
export const TOKEN_WS = /^\s+/;

const PARSED_CACHE_THRESHOLD = 10;

const parsedExpressionCount = {};
const parsedExpressionCache = {};

export default function parse(expression) {
    if (expression in parsedExpressionCache) {
        return parsedExpressionCache[expression].clone();
    }

    let lexIdx = 0;
    function lex() {
        const remainder = expression.substr(lexIdx);
        if (!remainder) return 'EOF';
        let matches;
        let output;
        if (matches = TOKEN_WS.exec(remainder)) {
            lexIdx += matches[0].length;
            return lex();
        } else if (matches = TOKEN_BOOL.exec(remainder)) {
            output = new ExpressionToken('boolean', matches[0].toLowerCase());

        } else if (matches = TOKEN_STRING.exec(remainder)) {
            output = new ExpressionToken('string', JSON.parse(matches[0]));

        } else if (matches = TOKEN_NUM.exec(remainder)) {
            output = new ExpressionToken('number', matches[0]);

        } else if (matches = TOKEN_FOPEN.exec(remainder)) {
            output = new ExpressionToken('funcopen', matches[1]);

        } else if (matches = TOKEN_XSOPEN.exec(remainder)) {
            output = new ExpressionToken('sheetref', matches[1]);

        } else if (matches = TOKEN_CELL_ID.exec(remainder)) {
            output = new ExpressionToken('ident', matches[0].toUpperCase());

        } else if (matches = TOKEN_RPAREN.exec(remainder)) {
            output = new ExpressionToken('rparen', ')');

        } else if (matches = TOKEN_LPAREN.exec(remainder)) {
            output = new ExpressionToken('lparen', '(');

        } else if (matches = TOKEN_BINOP_EXP.exec(remainder)) {
            output = new ExpressionToken('binop_expon', matches[0]);

        } else if (matches = TOKEN_BINOP_TIMES.exec(remainder)) {
            output = new ExpressionToken('binop_times', matches[0]);

        } else if (matches = TOKEN_BINOP_ADD.exec(remainder)) {
            output = new ExpressionToken('binop_add', matches[0]);

        } else if (matches = TOKEN_BINOP_COMP.exec(remainder)) {
            output = new ExpressionToken('binop_comp', matches[0]);

        } else if (matches = TOKEN_COMMA.exec(remainder)) {
            output = new ExpressionToken('comma', ',');

        } else if (matches = TOKEN_PERCENT.exec(remainder)) {
            output = new ExpressionToken('percent', '%');

        } else if (matches = TOKEN_COLON.exec(remainder)) {
            output = new ExpressionToken('colon', ':');

        } else {
            throw new SyntaxError(`Unknown token: ${remainder}`);
        }
        if (matches) {
            lexIdx += matches[0].length;
        }
        return output;
    }

    let peeked;
    function peek() {
        return peeked = peeked || lex();
    }
    function pop() {
        const output = peeked || lex();
        peeked = null;
        return output;
    }
    function accept(type) {
        const peeked = peek();
        if (!peeked || peeked.type !== type) return null;
        return pop();
    }
    function assert(type) {
        const popped = pop();
        if (popped.type !== type) {
            throw new SyntaxError(`Expected ${type}, got ${popped.type}`);
        }
        return popped;
    }

    function parsePrimitive() {
        let accepted;
        let negative = peek();
        if (negative && negative.value === '-') {
            negative = true;
            pop();
        } else {
            negative = false;
        }
        if (accepted = accept('boolean')) {
            return new nodes.LiteralBoolean(accepted.value === 'true');

        } else if (accepted = accept('number')) {
            let raw = accepted.value;
            let tmp = parseFloat(accepted.value);
            if (accept('percent')) {
                raw += '%';
                tmp /= 100;
            }
            return new nodes.LiteralNumber(tmp, raw);

        } else if (accepted = accept('string')) {
            return new nodes.LiteralString(accepted.value);

        } else if (accepted = accept('ident')) {
            return parseIdentifier(accepted);
        }

        throw new SyntaxError(`Unrecognized primitive value: ${peek()}`);
    }
    function parseIdentifier(accepted = null) {
        if (!accepted) {
            accepted = assert('ident');
        }
        const rematched = TOKEN_CELL_ID.exec(accepted.value);
        return new nodes.Identifier(
            rematched[2] + rematched[4],
            rematched[3] === '$',
            rematched[1] === '$',
            accepted.value
        );
    }
    function parseRange() {
        const base = parsePrimitive();
        if (!base || base.type !== 'identifier') return base;
        if (accept('colon')) {
            const end = assert('ident');
            return new nodes.Range(base, parseIdentifier(end));
        }
        return base;
    }
    function parseUnary() {
        const op = accept('binop_add');
        if (!op) {
            return parseParen();
        }
        if (op.value === '-') {
            return new nodes.UnaryMinus(parseParen());
        }
        if (op.value === '+') {
            return new nodes.UnaryPlus(parseParen());
        }
        throw new Error(`Unrecognized unary operator "${op.value}"`);
    }
    function parseParen() {
        if (!accept('lparen')) {
            return parseFunc();
        }
        const output = parseExpression();
        assert('rparen');
        return output;
    }
    function parseFunc() {
        const funcName = accept('funcopen');
        if (!funcName) {
            return parseSheetRef();
        }
        const args = [];
        while (peek()) {
            if (accept('rparen')) break;
            if (args.length) assert('comma');
            args.push(parseExpression());
        }
        return new nodes.Function(funcName.value, args);
    }
    function parseSheetRef() {
        const sheetref = accept('sheetref');
        if (!sheetref) {
            return parseRange();
        }
        return new nodes.SheetLookup(sheetref.value, parseRange());
    }
    function parseExponBinop(lval = parseUnary()) {
        const peeked = accept('binop_expon');
        if (!peeked) {
            return lval;
        }
        return parseExponBinop(
            new nodes.BinopExpon(lval, parseUnary())
        );
    }
    function parseTimesBinop(lval = parseExponBinop()) {
        const peeked = accept('binop_times');
        if (!peeked) {
            return lval;
        }
        switch (peeked.value) {
            case '*':
                return parseTimesBinop(new nodes.BinopMult(lval, parseExponBinop()));
            case '/':
                return parseTimesBinop(new nodes.BinopDiv(lval, parseExponBinop()));
        }
        throw new SyntaxError(`Unrecognized operator "${peeked.value}"`);
    }
    function parseAddBinop(lval = parseTimesBinop()) {
        const peeked = accept('binop_add');
        if (!peeked) {
            return lval;
        }
        switch (peeked.value) {
            case '+':
                return parseAddBinop(new nodes.BinopAdd(lval, parseTimesBinop()));
            case '&':
                return parseAddBinop(new nodes.BinopConcat(lval, parseTimesBinop()));
            case '-':
                return parseAddBinop(new nodes.BinopSub(lval, parseTimesBinop()));
        }
        throw new SyntaxError(`Unrecognized operator "${peeked.value}"`);
    }
    function parseCompBinop() {
        const lval = parseAddBinop();
        const peeked = accept('binop_comp');
        if (!peeked) {
            return lval;
        }
        switch (peeked.value) {
            case '<':
                return new nodes.BinopCompLT(lval, parseCompBinop());
            case '<=':
                return new nodes.BinopCompLTE(lval, parseCompBinop());
            case '>':
                return new nodes.BinopCompGT(lval, parseCompBinop());
            case '>=':
                return new nodes.BinopCompGTE(lval, parseCompBinop());
            case '=':
                return new nodes.BinopCompEQ(lval, parseCompBinop());
            case '<>':
                return new nodes.BinopCompNEQ(lval, parseCompBinop());
        }
        throw new SyntaxError(`Unrecognized operator "${peeked.value}"`);
    }
    function parseExpression() {
        return parseCompBinop();
    }

    const output = parseExpression();

    if (!(expression in parsedExpressionCount)) {
        parsedExpressionCount[expression] = 1;
    } else {
        parsedExpressionCount[expression]++;
        if (parsedExpressionCount[expression] >= PARSED_CACHE_THRESHOLD) {
            parsedExpressionCache[expression] = output;
        }
    }

    return output;

};

export {
    getCellID,
    getCellPos,
};
