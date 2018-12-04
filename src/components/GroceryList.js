import React from 'react'
import AddItem from './AddItem'
import ItemList from "./enhancers/FireStoreItemList";
import Header from "./Header";
import SignOut from "./security/SignOut";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Spinner} from "./Spinner";

export const GroceryList = (props) => (
    <div>
        <SignOut/>
        <Header/>
        {props.auth.uid
            ? <ItemList auth={props.auth.uid}/>
            : <Spinner/>}
        <AddItem/>
    </div>
);

export default compose(
    firebaseConnect()
)(GroceryList)
