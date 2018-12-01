import {connect} from 'react-redux'
import {removeItem} from '../actions'
import ItemList from "../components/ItemList";


const mapStateToProps = state => ({
    items: state.todos
});

const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList)
