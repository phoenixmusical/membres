import React from 'react';
import NavBar from '../components/NavBar';

export default class AppPage extends React.Component {
    render(){
        return (
            <div className="page-wrapper">
                <NavBar />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
