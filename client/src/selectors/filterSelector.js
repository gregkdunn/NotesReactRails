import { createSelector } from 'reselect'

const getFilterParameter = (state) => state.get('filterKeywords')
const getItems = (state) => state.get('items')

export const getItemsFilteredByKeyword = createSelector(
  [ getFilterParameter, getItems ],
  (filterParameter, items) => {
  	    console.log('getItemsFilteredByKeyword Selector')
  	if(filterParameter && filterParameter.length > 0) {
        return items.filter(item => (item.get('title').toLowerCase().includes(filterParameter)  || item.get('content').toLowerCase().includes(filterParameter))
        )
  	} else {
        return items  
    }
  }
)

