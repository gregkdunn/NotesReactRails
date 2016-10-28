import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { filterNotes } from '../actions/notesActions'
import TextField from 'material-ui/TextField'

let NoteFilter = ({filterKeywords = '', dispatch}) => {
    console.log('NoteFilter')
    console.dir(filterKeywords)

    let onChangeHandler = (evt) => {
        console.log('NoteFilter.onChangeHandler')
        console.dir(evt)
        console.log('filterKeyword')
        console.dir(filterKeywords)

        const field = evt.target
        if (field) {
            dispatch(filterNotes(field.value))
        }
    }

    const sectionStyle = {
        margin:'16px'
    }
	
    return (
      <div style={sectionStyle}>
        <TextField floatingLabelText="Filter By" value={filterKeywords} onChange={onChangeHandler}/>  
      </div>
    )
}

NoteFilter.propTypes = {
    filterKeywords: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        filterKeywords: state.getIn(['notes', 'filterKeywords'])
    }
};

NoteFilter = connect(mapStateToProps)(NoteFilter)
export default NoteFilter