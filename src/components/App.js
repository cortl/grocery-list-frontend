import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import GroceryList from "./GroceryList";
import requireAuth from "./security/requireAuth";
import SignIn from "./security/SignIn";
import { Settings } from "./settings/Settings";

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={requireAuth(GroceryList)} />
            <Route exact path="/settings" component={requireAuth(Settings)} />
            <Route exact path="/signIn" component={SignIn} />
        </React.Fragment>
    </BrowserRouter>
);

export default App
