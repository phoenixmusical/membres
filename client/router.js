import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import AppPage from './pages/AppPage';
import HomePage from'./pages/HomePage';
import NotFoundPage from'./pages/NotFoundPage';

export default (
    <Router>
        <Route name="app" path="/" component={AppPage}>
            <IndexRoute component={HomePage} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
);