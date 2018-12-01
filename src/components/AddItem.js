import React from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions/index'

export class AddItem extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render(){
       return(
           <div className="input-group mb-3 mt-3">
            <input type="text"
                   className="form-control"
                   placeholder="Apples..."
                   aria-label="Grocery Item"
                   aria-describedby="itemAddField"
                   value={this.state.value}
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
        this.props.addItem(this.state.value);
        this.setState({
            value: ''
        })
    };
}

export const mapDispatchToProps = dispatch => ({
    addItem: (itemValue) => dispatch(addItem(itemValue))
});

export default connect(null, mapDispatchToProps)(AddItem)
