import React from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions/index'

const AddItem = (props) => {
    let input;

    const addItemToList = () => {
        props.addItem(input.value);
        input.value = '';
    };

    return (
        <div className="input-group mb-3 mt-3">
            <input type="text"
                   className="form-control"
                   placeholder="Apples..."
                   aria-label="Grocery Item"
                   aria-describedby="itemAddField"
                   ref={node => input = node}
                   onKeyPress={(e) => {
                       if (e.key === 'Enter') {
                           addItemToList();
                       }
                   }}
            />
            <div className="input-group-append">
                <button
                    style={{zIndex: 0}}
                    onClick={(e) => addItemToList()}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="itemAddField">+
                </button>
            </div>
        </div>);
};

const mapDispatchToProps = dispatch => ({
    addItem: (itemValue) => dispatch(addItem(itemValue))
});

export default connect(null, mapDispatchToProps)(AddItem)
