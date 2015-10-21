import React from 'react';
import Page from '../components/Page';

export default class NotFoundPage extends Page {
    render(){
        return (
            <div>
                <h1>404 <small>Page not found</small></h1>
            </div>
        );
    }
}
