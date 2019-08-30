import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/index';
import { Input } from 'semantic-ui-react';

export class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <Input
                action={{
                    content: '+',
                    onClick: () => this.addItemToList()
                }}
                fluid
                maxLength={50}
                onChange={this.onChange}
                onKeyPress={this.onEnter}
                placeholder='Add item...'
                style={{ marginTop: '1em' }}
                value={this.state.value}
            />
        );
    }

    onChange = e => this.setState({ value: e.target.value })

    onEnter = (e) => {
        if (e.key === 'Enter') {
            this.addItemToList();
        }
    }

    addItemToList = () => {
        if (this.state.value && this.state.value.length < 50) {
            this.props.addItem(this.state.value, this.props.userId);
            this.setState({
                value: ''
            });
        }
    };
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    userId: PropTypes.string
};

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid
});

export const mapDispatchToProps = dispatch => ({
    addItem: (itemValue, userId) => dispatch(addItem(itemValue, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
