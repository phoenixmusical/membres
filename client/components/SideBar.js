import React from 'react';
import {Link} from 'react-router';
import BaseComponent from 'components/BaseComponent';

export default class SideBar extends BaseComponent {
    render () {
        let adminMenu = "";
        if (this.context.currentUser.isAdmin) {
            adminMenu = (
                <div>
                    <hr />
                    <div className="header">Administration</div>
                    <ul className="nav">
                        <li><a href={BASE_URL+"users/manage"}>Gestion des utilisateurs</a></li>
                        <li><a href={BASE_URL+"comities/manage"}>Gestion des comités</a></li>
                        <li><a href={BASE_URL+"events/manage"}>Gestion des évènements</a></li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="sidebar">
            	<div className="header">Comités</div>
            	<ul className="nav">
                    {this.props.comities.map(function (comity, index) {
                        return (
                            <li key={index}>
                                <a href={BASE_URL+"comities/"+comity.id}>{comity.name}</a>
                            </li>
                        );
                    })}
            	</ul>
                {adminMenu}
            </div>
        );
    }
}
