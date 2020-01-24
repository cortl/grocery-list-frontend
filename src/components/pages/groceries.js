import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Loader, Grid, Header} from 'semantic-ui-react';
import {firebaseConnect} from 'react-redux-firebase';

import Add from '../features/grocery-list/add';
import FirestoreItemList from '../../enhancers/firestore-connected-list';
import {Navigation} from '../features/navigation';

export class Groceries extends Component {
    render = () => {
        return (
            <Grid centered columns={1} container>
                <Grid.Column computer='10' mobile='16'>
                    <Navigation active='home' />
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
                    <FirestoreItemList auth={this.props.auth} />
                </Grid.Row>
                <Grid.Row>
                    <Add />
                </Grid.Row>
            </>
        );
    }
}

Groceries.propTypes = {
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
)(Groceries);
