import React, {Component} from 'react';
import AddItem from './AddItem';
import ItemList from '../enhancers/FireStoreItemList';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {MainNavigation} from './navigation/MainNavigation';
import PropTypes from 'prop-types';
import {Container, Loader, Grid} from 'semantic-ui-react';

export class GroceryList extends Component {
    render = () => {
        return (
            <Container>
                <MainNavigation/>
                {this.props.auth.uid
                    ? this.buildList()
                    : <Loader active/>}
            </Container>
        );
    }

    buildList = () => {
        return (
            <Grid centered columns={1} container>
                <Grid.Column computer='8' mobile='16'>
                    <Grid.Row>
                        <ItemList auth={this.props.auth}/>
                    </Grid.Row>
                    <Grid.Row>
                        <AddItem/>
                    </Grid.Row>
                </Grid.Column>

            </Grid>
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
