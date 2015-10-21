import React from 'react';
import Page from '../components/Page';
import Calendar from '../components/Calendar';
import PostList from '../components/PostList';
import comities from '../stores/comities';

export default class ComityPage extends Page {
    constructor (props) {
        super(props);
        console.log('props', props);
        this.state = {
            comity: null,
            events: [],
            posts: []
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange (comities) {
        const id = this.props.params.id;
        for (var index in comities) {
            if (comities[index].id === id) {
                this.setState({...this.state, comity: comities[index]});
                break;
            }
        }
    }
    componentDidMount () {
        this.onUnmount(comities.watch(this.onChange));
    }
    render () {
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
