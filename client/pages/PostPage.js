import React from 'react';
import Page from 'components/Page';
import BaseComponent from 'components/BaseComponent';
import dateFormatter from 'utils/date-formatter';

class Message extends BaseComponent {
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
        return (
            <div className="message">
                <div className="message-details">
                    <div className="message-author">{message.author.name}</div>
                    <div className="message-date">{dateFormatter.smartTime(message.date)}</div>
                    {actions}
                </div>
                <div className="message-content">
                    {content}
                </div>
            </div>
        );
    }
}

class CreateMessageForm extends React.Component {
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
    }
    onSubmit (event) {
        event.preventDefault();
        var text = this.refs.text.value;
        this.refs.text.value = "";
        this.resizeTextarea();
        if (text) {
            this.props.onSave(text);
        }
    }
    resizeTextarea () {
        $(this.refs.text).height(0).height(this.refs.text.scrollHeight);
    }
    render () {
        return (
            <div className="create-message">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <textarea ref="text" className="form-control" onChange={this.resizeTextarea} placeholder="Écrivez un message" />
                    <div className="actions">
                        <input type="submit" className="btn btn-sm btn-primary" value="Publier" />
                    </div>
                </form>
            </div>
        );
    }
}

export default class PostPage extends Page {
    constructor (props) {
        super(props);
        this.state = {
            post: {
                name: "",
                creator: {},
                comity: {}
            },
            messages: []
        };

        this.writeMessage = this.writeMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
    }
    getPageName () {
        return 'post';
    }
    writeMessage (text) {
        var message = {
            id: "",
            author: this.context.currentUser,
            date: new Date(),
            content: text
        };
        this.setState({
            messages: [message].concat(this.state.messages)
        });
        this.action('write-message', {
            post: this.state.post.id,
            text: text
        }).then(this.refreshPage, this.onError);
    }
    editMessage (message) {
        this.action('edit-message', {
            post: this.state.post.id,
            message: message.id,
            content: message.content
        }).then(this.refreshPage, this.onError);
    }
    render () {
        const {post, messages} = this.state;
        const self = this;
        return (
            <div>
                <h2 className="comity-name">{post.comity.name}</h2>
                <h3>{post.name}</h3>
                <CreateMessageForm onSave={this.writeMessage} />
                {messages.map(function (message, index) {
                    return <Message key={index} message={message} onEdit={self.editMessage} />
                })}
            </div>
        );
    }
}
