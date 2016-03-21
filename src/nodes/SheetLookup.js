import BaseNode from './BaseNode';


export default class SheetLookup extends BaseNode {
    constructor(sheet, base) {
        super();
        this.sheet = sheet;
        this.base = base;
    }
    findSheetDependencies(cb) {
        this.findCellDependnecies(cellID => {
            cb(this.sheet, cellID);
        });
    }
    clone() {
        return new SheetLookup(
            this.sheet,
            this.base.clone()
        );
    }
    run(sheet) {
        return this.base.run(sheet.getSheet(sheet));
    }
    toString() {
        return `${this.sheet}!${this.base}`;
    }
};
