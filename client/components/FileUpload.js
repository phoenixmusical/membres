import React from 'react';
import s3upload from 'utils/s3upload';
import ProgressBar from './ProgressBar';

export default class FileUpload extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status: 'init',
            error: null,
            progress: 0,
            uploadRequest: null
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleUploadDone = this.handleUploadDone.bind(this);
    }
    handleProgress (progress) {
        console.log('handleProgress', progress);
        this.setState({progress});
    }
    handleError (error) {
        console.log('handleError', error);
        this.setState({
            status: 'error',
            error: error,
            progress: 0,
            uploadRequest: null
        });
    }
    handleUploadDone (uploadRequest) {
        console.log('handleUploadDone', uploadRequest.id);
        this.setState({
            status: 'init',
            error: null,
            progress: 0,
            uploadRequest: null
        });
        const file = {
            id: uploadRequest.id,
            name: uploadRequest.file.name,
            mime_type: uploadRequest.file.type
        };
        this.props.onUpload(file);
    }
    handleUpload (event) {
        const file = event.target.files[0];
        console.log('handleUpload', file);
        this.setState({
            status: 'uploading',
            error: null,
            progress: 0,
            uploadRequest: null
        });
        s3upload(file).then(function (uploadRequest) {
            console.log('uploading', uploadRequest);
            this.setState({
                uploadRequest: uploadRequest
            });
            uploadRequest.on('error', this.handleError);
            uploadRequest.on('progress', this.handleProgress);
            uploadRequest.on('done', this.handleUploadDone.bind(null, uploadRequest));
        }.bind(this), this.handleError);
    }
    render () {
        return (
            <div>
                <input type="file" onChange={this.handleUpload} />
                <ProgressBar progress={this.state.progress} />
                <div className="error">{this.state.error}</div>
            </div>
        );
    }
}
