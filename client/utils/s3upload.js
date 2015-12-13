/**
 * Based on:
 * https://github.com/odysseyscience/react-s3-uploader
 */

import {sendAction} from '../actions';
import CORSUploadRequest from './CORSUploadRequest';

function signUploadUrl(file) {
    const mimeType = file.type;
    return sendAction('sign-s3-upload', {mimeType});
}

export default function s3upload(file) {
    return signUploadUrl(file)
        .then(function (result) {
            const {id, signedUrl} = result;
            const uploadRequest = new CORSUploadRequest('PUT', signedUrl);
            uploadRequest.id = id;
            uploadRequest.file = file;

            uploadRequest.setHeader('Content-Type', file.type);

            const disposition = file.type.substr(0, 6) === 'image/' ? 'inline' : 'attachment';
            const fileName = file.name.replace(/\s+/g, "_").normalize();
            uploadRequest.setHeader('Content-Disposition', disposition + '; filename=' + fileName);

            uploadRequest.send(file);
            return uploadRequest;
        });
}
