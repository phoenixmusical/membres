import React from 'react';
import Page from '../components/Page';
import Calendar from '../components/Calendar';
import PostList from '../components/PostList';

export default class HomePage extends Page {
    constructor(props){
        super(props);
        this.state = {
            events: [],
            posts: []
        };
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <Calendar events={this.state.events} />
                </div>
                <div className="col-md-6">
                    <PostList posts={this.state.posts} />
                </div>
            </div>
        );
    }
}
