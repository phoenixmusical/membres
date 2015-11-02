import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router as ReactRouter, Route, IndexRoute} from 'react-router';

import AppPage from './pages/AppPage';
import HomePage from './pages/HomePage';
import ComityPage from './pages/ComityPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';

class Router extends ReactRouter {
    static get childContextTypes(){
        return {
            currentUser: React.PropTypes.object
        };
    }
    getChildContext () {
        const context = {};
        context.currentUser = window.USER;
        return context;
    }
}

export default (
    <Router history={createBrowserHistory()}>
        <Route name='app' path='/' component={AppPage}>
            <IndexRoute component={HomePage} />
            <Route path='/comities/:comity' component={ComityPage} />
            <Route path='/posts/:post' component={PostPage} />
            <Route path='*' component={NotFoundPage} />
        </Route>
    </Router>
);
