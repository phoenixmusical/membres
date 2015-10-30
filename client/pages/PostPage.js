import React from 'react';
import Page from 'components/Page';

class Message extends React.Component {
    render () {
        const message = this.props.message;
        return (
            <div>
                <p>{message.body}</p>
            </div>
        );
    }
}

export default class PostPage extends Page {
    constructor (props) {
        super(props);
        this.state = {
            post: {},
            messages: []
        };
    }
    getPageName () {
        return 'post';
    }
    render(){
        const {post, messages} = this.state;
        return (
            <div>
                {messages.map(function (message, index) {
                    return <Message key={index} message={message} />
                })}
            </div>
        );
    }
}
