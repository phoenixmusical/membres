import React from 'react';
import {Link} from 'react-router';
import Page from '../components/Page';
import Calendar from '../components/Calendar';
import PostList from '../components/PostList';

export default class ComityPage extends Page {
    constructor (props) {
        super(props);
        this.state = {
            comity: {},
            events: [],
            posts: []
        };
    }
    getPageName () {
        return 'comity';
    }
    receiveData (data) {
        if (data.events) {
            data.events.forEach(function (event) {
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            });
        }
        this.setState(data);
    }
    render () {
        const {comity, events, posts} = this.state;
        return (
            <div>
                <h3>{comity.name}</h3>

                <div className="row">
                	<div className="col-md-6">
                		<a className="btn btn-sm btn-primary pull-right"
                            href={BASE_URL+"comities/" + comity.id + "/events/create"}>
                			<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                			Ajouter un évènement
                		</a>
                		<Calendar events={events} />
                	</div>
                	<div className="col-md-6">
                		<div className="clearfix">
                			<h4 className="pull-left" style={{marginTop: 0}}>Discussions</h4>
                			<a className="btn btn-sm btn-primary pull-right"
                                href={BASE_URL+"comities/" + comity.id + "/posts/create"}>
                				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                				Ajouter une discussion
                			</a>
                		</div>
                		<div className="list-group">
                			<PostList posts={posts} />
                		</div>
                	</div>
                </div>
            </div>
        );
    }
}
