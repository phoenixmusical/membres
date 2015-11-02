import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class NavBar extends React.Component {
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse-1">
                            <span className="sr-only">Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href={BASE_URL} className="navbar-brand">
                            PhoenixMusical<small className="text-muted">.ca/membres</small>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="main-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href={BASE_URL+"profil"}>Profil utilisateur</a></li>
                            <li><a href={BASE_URL+"logout"}>Déconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
