import React from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions/index'
import PropTypes from 'prop-types'

export class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div className="input-group mb-3 mt-3 pl-0 pr-0 col-md-8 offset-md-2">
                <input type="text"
                       className="form-control"
                       placeholder="Apples..."
                       aria-label="Grocery Item"
                       aria-describedby="itemAddField"
                       value={this.state.value}
                       autoFocus
                       maxLength={50}
                       onChange={e => this.setState({value: e.target.value})}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               this.addItemToList();
                           }
                       }}
                />
                <div className="input-group-append">
                    <button
                        onClick={() => this.addItemToList()}
                        className="btn btn-outline-secondary"
                        style={{zIndex: 0}}
                        type="button"
                        id="itemAddField">+
                    </button>
                </div>
            </div>)
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
