import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import GroceryList from "./GroceryList";
import requireAuth from "../enhancers/requireAuth";
import SignIn from "./security/SignIn";

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={requireAuth(GroceryList)} />
            <Route exact path="/signIn" component={SignIn} />
        </React.Fragment>
    </BrowserRouter>
);

export default App
