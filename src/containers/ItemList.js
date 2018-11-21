import {connect} from 'react-redux'
import {completeItem, toggleTodo, VisibilityFilters} from '../actions'
import ItemList from "../components/ItemList";


const mapStateToProps = state => ({
    items: state.todos
});

const mapDispatchToProps = dispatch => ({
    toggleItem: id => dispatch(completeItem(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList)
