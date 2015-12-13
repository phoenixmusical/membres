import React from 'react';
import BaseComponent from './BaseComponent';
import dateFormatter from 'utils/date-formatter';

export default class Message extends BaseComponent {
    constructor (props) {
        super(props);
        this.state = {
            inEdition: false
        };

        this.startEditing = this.startEditing.bind(this);
        this.submit = this.submit.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
    }
    startEditing (event) {
        event.preventDefault();
        this.setState({
            inEdition: true
        });
    }
    submit (event) {
        event.preventDefault();
        const {message, onEdit} = this.props;
        const content = this.refs.text.value;
        message.content = content;
        this.setState({
            inEdition: false
        });
        onEdit(message);
    }
    resizeTextarea () {
        $(this.refs.text).height(0).height(this.refs.text.scrollHeight);
    }
    render () {
        const {message} = this.props;
        let content;
        let actions = "";
        if (this.state.inEdition) {
            content = (
                <form onSubmit={this.submit}>
                    <textarea className="form-control" ref="text" defaultValue={message.content} onChange={this.resizeTextarea} onFocus={this.resizeTextarea} />
                    <div className="actions">
                        <input type="submit" className="btn btn-sm btn-primary" value="Enregistrer" />
                    </div>
                </form>
            );
            setTimeout(this.resizeTextarea, 0);
        } else {
            if (this.context.currentUser.id === message.author.id) {
                actions = (
                    <div className="actions">
                        <a className="btn btn-sm btn-default" href="#edit" onClick={this.startEditing}>Modifier</a>
                    </div>
                );
            }
            content = <div className="message-text">{message.content}</div>;
        }
        let messageFiles = "";
        if (message.files && message.files.length > 0) {
            messageFiles = (
                <div className="message-files">
                    {message.files.map(function (file, index) {
                        return (
                            <a key={index}
                                className="file btn btn-default"
                                target="_blank"
                                href={`${BASE_URL}file/${file.id}`}>
                                <i className="mdi mdi-file" /> {file.name}
                            </a>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="message">
                <div className="message-details">
                    <div className="message-author">{message.author.name}</div>
                    <div className="message-date">{dateFormatter.smartTime(message.date)}</div>
                    {actions}
                </div>
                <div className="message-content">
                    {content}
                    {messageFiles}
                </div>
            </div>
        );
    }
}
