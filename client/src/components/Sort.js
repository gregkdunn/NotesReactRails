import React, { PropTypes } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'


let Sort = ({sortValues, selectedValue, sortAction}) => {
	
	//console.log('Sort')
	//console.dir(selectedValue)

	const styles = {
	customWidth: {
		width: 256,
	}
	}

	const handleChange = (event, index, value) => {
		sortAction(value)
	}

    return (
    	<div className="fl db w-100 cf">
    	<label className='db ttu fw5 f6 gray roboto'>Sort By:</label>
	    <DropDownMenu value={selectedValue} onChange={handleChange} style={styles.customWidth}>
			{sortValues.map(sort => {
				return <MenuItem key={sort.order} value={sort.value} primaryText={sort.title} />
			})}  
        </DropDownMenu>  
        </div>
    )
}

Sort.propTypes = {
	sortValues: PropTypes.array.isRequired,
    selectedValue: PropTypes.string.isRequired,
	sortAction: PropTypes.func.isRequired
}

export default Sort