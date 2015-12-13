import {EventEmitter} from 'events';

export default class CORSUploadRequest extends EventEmitter {
    constructor (method, url) {
        super();

        let xhr = new XMLHttpRequest();
        if (xhr.withCredentials != null) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            throw new Error('CORS not supported');
        }
        this.xhr = xhr;

        const self = this;

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                self.emit('done');
            } else {
                self.emit('error', new Error('Upload error: ' + xhr.status));
            }
        };

        xhr.onerror = function () {
            self.emit('error', new Error("Upload error"));
        };

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentLoaded = Math.round(event.loaded / event.total * 100);
                self.emit('progress', percentLoaded);
            }
        };
    }
    setHeader (name, value) {
        this.xhr.setRequestHeader(name, value);
    }
    send (file) {
        this.xhr.send(file);
    }
    abort () {
        this.xhr && this.xhr.abort();
    }
}
