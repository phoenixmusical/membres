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
            user: {
                id: 0,
                isAdmin: false
            }
        };
    }
    getPageName () {
        return 'app';
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
