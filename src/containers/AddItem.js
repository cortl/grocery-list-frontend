import React from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions'

const AddItem = ({dispatch}) => {
    let input;

    return (
        <div className="input-group mb-3 mt-3">
            <input type="text"
                   className="form-control"
                   placeholder="Apples..."
                   aria-label="Grocery Item"
                   aria-describedby="itemAddField"
                   ref={node => input = node}
            />
            <div className="input-group-append">
                <button
                    onClick={(e) => dispatch(addItem(input.value))}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="itemAddField">+
                </button>
            </div>
        </div>);
};

export default connect()(AddItem)
