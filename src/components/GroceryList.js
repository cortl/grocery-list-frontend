import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Loader, Grid, Header} from 'semantic-ui-react';
import {firebaseConnect} from 'react-redux-firebase';

import AddItem from './AddItem';
import ItemList from '../enhancers/FireStoreItemList';
import {MainNavigation} from './navigation/MainNavigation';

export class GroceryList extends Component {
    render = () => {
        return (
            <Grid centered columns={1} container>
                <Grid.Column computer='10' mobile='16'>
                    <MainNavigation active='home' />
                    <Header as='h1'>{'Grocery List'}</Header>
                    {this.props.auth.uid
                        ? this.buildList()
                        : <Loader active />}
                </Grid.Column>
            </Grid>
        );
    }

    buildList = () => {
        return (
            <>
                <Grid.Row>
                    <ItemList auth={this.props.auth} />
                </Grid.Row>
                <Grid.Row>
                    <AddItem />
                </Grid.Row>
            </>
        );
    }
}

GroceryList.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    })
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(GroceryList);
