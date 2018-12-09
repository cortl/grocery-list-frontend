import React from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions/index'

export class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div className="input-group mb-3 mt-3">
                <input type="text"
                       className="form-control"
                       placeholder="Apples..."
                       aria-label="Grocery Item"
                       aria-describedby="itemAddField"
                       value={this.state.value}
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
                        style={{zIndex: 0}}
                        onClick={(e) => this.addItemToList()}
                        className="btn btn-outline-secondary"
                        type="button"
                        id="itemAddField">+
                    </button>
                </div>
            </div>)
    }

    addItemToList = () => {
        if (this.state.value && this.state.value.length < 50) {
            this.props.addItem(this.state.value, this.props.listId);
            this.setState({
                value: ''
            })
        }
    };
}

export const mapStateToProps = state => ({
    listId: state.user.ownList
});

export const mapDispatchToProps = dispatch => ({
    addItem: (itemValue, listId) => dispatch(addItem(itemValue, listId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
