import socket from './socket';

export function sendAction(method, params) {
    return socket.request('action', method, params);
}
