import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addItem } from '../actions/index'
import { Input } from 'semantic-ui-react';

export class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <Input
                action={{
                    content: '+',
                    onClick: () => this.addItemToList()
                }}
                fluid
                style={{ marginTop: '1em' }}
                placeholder='Add item...'
                maxLength={50}
                onChange={e => this.setState({ value: e.target.value })}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        this.addItemToList();
                    }
                }}
                value={this.state.value}
            />
        );
    }

    addItemToList = () => {
        if (this.state.value && this.state.value.length < 50) {
            this.props.addItem(this.state.value, this.props.userId);
            this.setState({
                value: ''
            })
        }
    };
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    userId: PropTypes.string
}

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid
});

export const mapDispatchToProps = dispatch => ({
    addItem: (itemValue, userId) => dispatch(addItem(itemValue, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
