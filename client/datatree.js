import socket from './socket';

export function query (method, params) {
    return socket.request('query', method, params);
}
