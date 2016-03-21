export default class BaseNode {
    adjust(deltaRow, deltaCol) {
        this.shallowWalk(node => {
            node.adjust(deltaRow, deltaCol);
        });
    }
    findCellDependencies(cb) {
        this.shallowWalk(node => node.findCellDependencies(cb));
    }
    findSheetDependencies(cb) {
        this.shallowWalk(node => node.findSheetDependencies(cb));
    }

    clone() {
        throw new Error('Not Implemented');
    }
    shallowWalk() {}
    walk(cb) {
        cb(this);
        this.shallowWalk(node => node.walk(cb));
    }
    run() {
        throw new Error('Not Implemented');
    }
    toString() {
        throw new Error('Not Implemented');
    }
};
