import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

let Filter = ({filterKeywords = '', filterAction}) => {
    //console.log('Filter')
    //console.dir(filterKeywords)

    let onChangeHandler = (evt) => {
        console.log('Filter.onChangeHandler')
        console.dir(evt)
        console.log('filterKeyword')
        console.dir(filterKeywords)

        const field = evt.target
        if (field) {
            filterAction(field.value)
        }
    }
	
    return (
      <div className="ma2">
        <TextField floatingLabelText="Filter By" value={filterKeywords} onChange={onChangeHandler}/>  
      </div>
    )
}

Filter.propTypes = {
    filterKeywords: PropTypes.string.isRequired,
    filterAction: PropTypes.func.isRequired
}

export default Filter