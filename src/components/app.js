import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Groceries from './pages/groceries';
import Settings from './pages/settings';
import SignIn from './pages/sign-in';
import requireAuth from '../enhancers/require-auth';


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={requireAuth(Groceries)} exact path='/' />
            <Route component={requireAuth(Settings)} exact path='/settings' />
            <Route component={SignIn} exact path='/login' />
            <Redirect from='/*' to='/' />
        </Switch>
    </BrowserRouter>
);

export default App;
