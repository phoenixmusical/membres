import React from 'react';
import {Link} from 'react-router';
import dateFormatter from '../utils/date-formatter';

export default class PostList extends React.Component {
    renderPost (post, index) {
        return (
            <Link key={index} className="list-group-item" to={"/posts/"+post.id}>
                <h4 className="list-group-item-heading">{post.name}</h4>
                <p className="list-group-item-text">{dateFormatter.datetime(post.dateUpdated)}</p>
            </Link>
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
