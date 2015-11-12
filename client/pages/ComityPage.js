import React from 'react';
import {Link} from 'react-router';
import Page from '../components/Page';
import Calendar from '../components/Calendar';
import PostList from '../components/PostList';
import Button from '../components/Button';

class SubscribeUnsubscribeButton extends React.Component {
    render () {
        if (this.props.subscribed) {
            return <Button onClick={this.props.unsubscribe}>{"Me désinscrire de ce comité"}</Button>
        } else {
            return <Button onClick={this.props.subscribe}>{"M'inscrire à ce comité"}</Button>;
        }
    }
}

export default class ComityPage extends Page {
    constructor (props) {
        super(props);
        this.state = {
            comity: {
                members: []
            },
            events: [],
            posts: []
        };

        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
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
    subscribe () {
        this.action('comity-subscribe', {
            comity: this.state.comity.id
        }).then(this.refreshPage, this.onError);
    }
    unsubscribe () {
        this.action('comity-unsubscribe', {
            comity: this.state.comity.id
        }).then(this.refreshPage, this.onError);
    }
    get isSubscribed () {
        const {members} = this.state.comity;
        if (!members) {
            return false;
        }
        const userId = this.context.currentUser.id;
        for (let index in members) {
            if (members[index].id == userId) {
                return true;
            }
        }
        return false;
    }
    renderSubscribeButton () {
        if (this.isSubscribed) {
            return <Button type="primary" size="sm" className="pull-right" onClick={this.unsubscribe}>{"Me désinscrire de ce comité"}</Button>;
        } else {
            return <Button type="primary" size="sm" className="pull-right" onClick={this.subscribe}>{"M'inscrire à ce comité"}</Button>;
        }
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
                	<div className="col-md-6">
                		<div className="clearfix">
                			<h4 className="pull-left" style={{marginTop: 0}}>Membres</h4>
                            {this.renderSubscribeButton()}
                		</div>
                		<div className="list-group">
                            {this.state.comity.members.map(function (member, index) {
                                return <div key={index} className="list-group-item">{member.name}</div>;
                            })}
                		</div>
                	</div>
                </div>
            </div>
        );
    }
}
