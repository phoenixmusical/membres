import SockSubIO from 'socksub.io';
import url from 'url';

const parsedUrl = url.parse(BASE_URL);

module.exports = new SockSubIO(parsedUrl.protocol+'//'+parsedUrl.host, {
    path: parsedUrl.pathname + 'socket.io'
});
