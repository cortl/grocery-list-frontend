import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Input, Label} from 'semantic-ui-react';

import {addItem} from '../../../actions';

export const LIMIT = 40;
export class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            value: ''
        };
    }

    render() {
        return (
            <>
                <Input
                    action={{
                        content: '+',
                        color: this.state.error ? 'red' : 'teal',
                        onClick: () => this.validateInput() && this.addItemToList()
                    }}
                    error={this.state.error}
                    fluid
                    onBlur={this.validateInput}
                    onChange={this.onChange}
                    onKeyPress={this.onEnter}
                    placeholder='Add item...'
                    style={{marginTop: '1em'}}
                    value={this.state.value}
                />
                {this.state.error && <Label color='red' pointing>{`You can't enter an item with more than ${LIMIT} characters`}</Label>}
            </>
        );
    }

    onChange = e => this.setState({value: e.target.value})

    onEnter = (e) => {
        if (e.key === 'Enter') {
            this.addItemToList();
        }
    }

    validateInput = () => {
        if (this.state.value.length > LIMIT) {
            this.setState({error: true});
            return false;
        } else {
            this.setState({error: false});
            return true;
        }
    }

    addItemToList = () => {
        if (this.state.value && this.validateInput()) {
            this.props.addItem(this.state.value, this.props.userId);
            this.setState({
                value: ''
            });
        }
    };
}

Add.propTypes = {
    addItem: PropTypes.func.isRequired,
    userId: PropTypes.string
};

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid
});

export const mapDispatchToProps = dispatch => ({
    addItem: (itemValue, userId) => dispatch(addItem(itemValue, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
