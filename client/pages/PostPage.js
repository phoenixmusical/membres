import React from 'react';
import Page from 'components/Page';
import Message from 'components/Message';
import CreateMessageForm from 'components/CreateMessageForm';

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
    writeMessage (text, files) {
        var message = {
            id: "",
            author: this.context.currentUser,
            date: new Date(),
            content: text,
            files: files
        };
        this.setState({
            messages: [message].concat(this.state.messages)
        });
        this.action('write-message', {
            post: this.state.post.id,
            text: text,
            files: files
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
