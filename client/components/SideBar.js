import React from 'react';
import {Link} from 'react-router';

export default class SideBar extends React.Component {
    render () {
        let adminMenu = "";
        if (this.props.isAdmin) {
            adminMenu = (
                <div>
                    <hr />
                    <div className="header">Administration</div>
                    <ul className="nav">
                        <li><Link to="users/manage">Gestion des utilisateurs</Link></li>
                        <li><Link to="comities/manage">Gestion des comités</Link></li>
                        <li><Link to="events/manage">Gestion des évènements</Link></li>
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
                                <Link to={"/comities/"+comity.id}>{comity.name}</Link>
                            </li>
                        );
                    })}
            	</ul>
                {adminMenu}
            </div>
        );
    }
}
