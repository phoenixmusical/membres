import socket from 'socket';

class LiveList {
    constructor (store, initialData) {
        this.store = store;
        this.data = initialData;
        this.watchers = [];
        this.onChange = this.onChange.bind(this);
        this.start();
    }
    addWatcher (watcher) {
        this.watchers.push(watcher);
        return this.removeWatcher.bind(this, watcher);
    }
    removeWatcher (watcher) {
        var index = this.watchers.indexOf(watchers);
        if (index >= 0) {
            this.watchers.splice(index, 1);
        }
    }
    setData (newData) {
        const oldData = this.data;
        this.data = newData;
        this.listeners.forEach(function (listener) {
            listener(data, oldData);
        });
    }
    onChange (action, data) {
        this.store.list().then(this.setData.bind(this));
    }
    start () {
        this.store.addListener(this.onChange);
    }
    stop () {
        this.store.removeListener(this.onChange);
    }
}

export default class Store {
    constructor (name) {
        this.name = name;
        this.subscribed = false;
        this.listeners = [];
        this.onChange = this.onChange.bind(this);
    }
    addListener (listener) {
        this.listeners.push(listener);
        if (!this.subscribed) {
            this.subscribe();
        }
    }
    removeListener (listener) {
        var index = this.listeners.indexOf(listener);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
        if (this.listeners.length === 0 && this.subscribed) {
            this.unsubscribe();
        }
    }
    onChange (action, data) {
        this.listeners.forEach(function (listener) {
            listener(action, data);
        });
    }
    subscribe () {
        this.subscribed = true;
        const path = '/' + this.name;
        socket.on(path, this.onChange);
        socket.subscribe(path).done();
    }
    unsubscribe () {
        this.subscribed = false;
        const path = '/' + this.name;
        socket.removeListener(path, this.onChange);
        socket.unsubscribe(path).done();
    }
    request (action, data) {
        return socket.request('/'+this.name+'/'+action, data);
    }
    get (id) {
        return this.request('get', id);
    }
    list (data) {
        return this.request('list', data);
    }
    create (data) {
        return this.request('create', data);
    }
    update (data) {
        return this.request('update', data);
    }
    remove (data) {
        return this.request('remove', data);
    }
    createLiveList () {
        const store = this;
        return this.list()
            .then(function (data) {
                    return new LiveList(store, data);
            });
    }
}
