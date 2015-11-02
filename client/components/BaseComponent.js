import React from 'react';

export default class BaseComponent extends React.Component {
    static get contextTypes () {
        return {
            currentUser: React.PropTypes.object
        };
    }
    constructor (props) {
        super(props);
        this.unmountListeners = [];
    }
    onUnmount (listener) {
        this.unmountListeners.push(listener);
    }
    componentWillUnmount () {
        const self = this;
        this.unmountListeners.forEach(function (listener) {
            listener.apply(self);
        });
        this.unmountListeners = [];
    }
}
