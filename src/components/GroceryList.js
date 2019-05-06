import React, {Component} from 'react'
import AddItem from './AddItem'
import ItemList from "../enhancers/FireStoreItemList";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Spinner} from "./Spinner";
import {connect} from "react-redux";
import {MainNavigation} from "./navigation/MainNavigation";
import PropTypes from 'prop-types'

export class GroceryList extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render = () => {
        return (
            <div className='container'>
                <MainNavigation/>
                {this.props.auth.uid
                    ? <ItemList
                        auth={this.props.auth}/>
                    : <Spinner/>}
                <AddItem/>
            </div>
        )
    }
}

GroceryList.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string.isRequired
    })
}

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(GroceryList)
