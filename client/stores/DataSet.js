import Store from './Store';

export default class DataSet {
    constructor (name) {
        this.store = new Store(name);
        this.liveListPromise = null;
    }
    list () {
        return this.store.list();
    }
    create () {
        return this.store.create();
    }
    update () {
        return this.store.update();
    }
    remove () {
        return this.store.update();
    }
    watch (watcher) {
        if (!this.liveListPromise) {
            this.liveListPromise = this.store.createLiveList();
        }
        this.liveListPromise.then(function (liveList) {
            liveList.addWatcher(watcher);
            watcher(liveList.data, liveList.data);
        });
        return this.unwatch.bind(this, watcher);
    }
    unwatch (watcher) {
        if (!this.liveListPromise) {
            return;
        }
        const self = this;
        this.liveListPromise.then(function (liveList) {
            liveList.removeWatcher(watcher);
            if (liveList.watchers.length === 0) {
                liveList.stop();
                self.liveListPromise = null;
            }
        });
    }
}
