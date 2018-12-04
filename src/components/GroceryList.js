import React from 'react'
import AddItem from './AddItem'
import ItemList from "./enhancers/FireStoreItemList";
import Header from "./Header";
import SignOut from "./security/SignOut";

const GroceryList = () => (
    <div>
        <SignOut/>
        <Header/>
        <ItemList/>
        <AddItem/>
    </div>
);

export default GroceryList
