import React, {Component} from 'react'
import AddItem from './AddItem'
import ItemList from "./enhancers/FireStoreItemList";
import Header from "./Header";
import SignOut from "./security/SignOut";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Spinner} from "./Spinner";
import {connect} from "react-redux";
import {loadUser} from "../actions";

export class GroceryList extends Component {
    constructor(props) {
        super(props);

        if (!props.auth.uid) {
            props.loadUser(props.auth.uid)
        }
    }


    render = () => {
        return (
            <div>
                <SignOut/>
                <Header text='Grocery List'/>
                {this.props.auth.uid
                    ? <ItemList
                        listIds={this.props.profile.lists}
                        auth={this.props.auth.uid}/>
                    : <Spinner/>}
                <AddItem/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.user
});

const mapDispatchToProps = dispatch => ({
    loadUser: (uid) => dispatch(loadUser(uid))
});


export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(GroceryList)
