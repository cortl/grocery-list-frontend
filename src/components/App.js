import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import GroceryList from './GroceryList';
import requireAuth from '../enhancers/requireAuth';
import SignIn from './security/SignIn';

const App = () => (
    <BrowserRouter>
        <>
            <Route component={requireAuth(GroceryList)} exact path='/'/>
            <Route component={SignIn} exact path='/signIn'/>
        </>
    </BrowserRouter>
);

export default App;
