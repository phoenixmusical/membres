import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import FileUpload from './FileUpload';

export default class CreateMessageForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            files: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
    }
    handleSubmit (event) {
        event.preventDefault();
        var text = this.refs.text.value;
        this.refs.text.value = "";
        const files = this.state.files;
        this.setState({
            files: []
        });
        this.resizeTextarea();
        if (text || files.length > 0) {
            this.props.onSave(text, files);
        }
    }
    resizeTextarea () {
        $(this.refs.text).height(0).height(this.refs.text.scrollHeight);
    }
    handleUpload (file) {
        console.log('upload finish', file);
        this.setState({
            files: this.state.files.concat([file])
        });
    }
    renderFiles () {
        const files = this.state.files;
        if (files.length === 0) {
            return "";
        }
        return (
            <div>
                {files.map(function (file, index) {
                    return (
                        <span key={index} className="file btn btn-default">
                            <i className="mdi mdi-file" /> {file.name}
                        </span>
                    );
                }.bind(this))}
            </div>
        );
    }
    render () {
        return (
            <div className="create-message">
                <form onSubmit={this.handleSubmit}>
                    <textarea ref="text" className="form-control" onChange={this.resizeTextarea} placeholder="Écrivez un message" />
                    <div className="actions">
                        <input type="submit" className="btn btn-sm btn-primary" value="Publier" />
                    </div>
                </form>
                {this.renderFiles()}
                <FileUpload onUpload={this.handleUpload} />
            </div>
        );
    }
}
