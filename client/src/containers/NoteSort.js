import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../selectors/selectorTypes'
import { sortNotes } from '../actions/notesActions'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'

let NoteSort = ({sortBy = selectors.SORT_BY_ID, dispatch}) => {
	
	console.log('NoteSort')
	console.dir(sortBy)

	const handleChange = (event, index, value) => {
		dispatch(sortNotes(value))
	}
	
	const menuItemStyle = {
		backgroundColor: 'white', 
		border: '0'
	}

    return (
	    <IconMenu style={menuItemStyle} iconButtonElement={<IconButton><ContentFilter /></IconButton>} value={sortBy} onChange={handleChange}>
	        <MenuItem style={menuItemStyle} value={selectors.SORT_BY_ID} primaryText="Id" />
	        <MenuItem style={menuItemStyle} value={selectors.SORT_BY_TITLE} primaryText="Title" />
	        <MenuItem style={menuItemStyle} value={selectors.SORT_BY_CREATED_DATE} primaryText="Created" />
	        <MenuItem style={menuItemStyle} value={selectors.SORT_BY_UPDATED_DATE} primaryText="Updated" />
        </IconMenu>  
      
    )
}

NoteSort.propTypes = {
    sortBy: PropTypes.string.isRequired
}


const mapStateToProps = (state) => {
    return {
    	sortBy: state.getIn(['notes', 'sortBy'])
    }
};

NoteSort = connect(mapStateToProps)(NoteSort)
export default NoteSort