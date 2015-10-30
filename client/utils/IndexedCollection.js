
export default class IndexedCollection {
    constructor () {
        this.map = {};
    }
    get (index) {
        return this.map[index] || [];
    }
    add (index, item) {
        if (this.map[index]) {
            this.map[index].push(item);
        } else {
            this.map[index] = [item];
        }
    }
}
