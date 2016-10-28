import { createSelector } from 'reselect'
import { getSortedItems } from '../selectors/sortSelector'

const getFilterParameter = (state) => state.get('filterKeywords')

export const getSortedItemsFilteredByKeyword = createSelector(
  [ getFilterParameter, getSortedItems ],
  (filterParameter, sortedItems) => {
  	    console.log('getSortedItemsFilteredByKeyword Selector')
  	if(filterParameter && filterParameter.length > 0) {
        return sortedItems.filter(item => (item.get('title').toLowerCase().includes(filterParameter)  || item.get('content').toLowerCase().includes(filterParameter))
        )
  	} else {
        return sortedItems  
    }
  }
)