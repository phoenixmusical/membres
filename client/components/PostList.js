import React from 'react';
import dateFormatter from '../utils/date-formatter';

export default class HomePage extends React.Component {
    renderPost(post){
        return (
            <a className="list-group-item" href="comities/{post.comity}/posts/{post.id}">
                <h4 className="list-group-item-heading">{post.name}</h4>
                <p className="list-group-item-text">{dateFormatter.datetime(post.dateUpdated)}</p>
            </a>
        );
    }
    render(){
        return (
            <div className="list-group">
                {this.props.posts.map(this.renderPost)}
            </div>
        );
    }
}
