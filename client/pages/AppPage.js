import React from 'react';
import Page from '../components/Page';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import comities from '../stores/comities';

export default class AppPage extends Page {
    constructor (props) {
        super(props);
        this.state = {
            comities: [],
            isAdmin: USER.isAdmin
        };
        this.unwatch = null;
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount () {
        this.onUnmount(comities.watch(this.onChange));
    }
    onChange (comities) {
        this.setState({...this.state, comities: comities});
    }
    render () {
        return (
            <div className="page-wrapper">
                <NavBar />
                <SideBar comities={this.state.comities} isAdmin={this.state.isAdmin} />
                <div className="page-view">
                	<div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
