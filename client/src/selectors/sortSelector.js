import { createSelector } from 'reselect'
import * as selectors from '../constants/selectorTypes'
import { getItemsFilteredByKeyword } from './filterSelector'

const getSortParameter = (state) => state.get('sortBy')

/* not currently used
const logPair = (a,b) => {
  console.log('-------------')
  console.log('a' + a.get('title') + ":" + a.get('importance'))
  console.log('b' + b.get('title') + ":" + b.get('importance'))
}
*/

const sortItems = (sortParameter, items) => {
    console.log('getSortedNotes Selector')
    switch (sortParameter) {
      case selectors.SORT_BY_ID:
        return items.sort(
          (a, b) => a.get('id') - b.get('id')
        )
      case selectors.SORT_BY_TITLE:
        return items.sort(
          (a, b) => a.get('title').localeCompare(b.get('title'))
        )
      case selectors.SORT_BY_IMPORTANCE:
        return items.sort(
          (a, b) => b.get('importance') - a.get('importance')
        )        
      case selectors.SORT_BY_CREATED_DATE:
        return items.sort(
          (a, b) => a.get('created_at').localeCompare(b.get('created_at'))
        )
      case selectors.SORT_BY_UPDATED_DATE:
        return items.sort(
          (a, b) => a.get('updated_at').localeCompare(b.get('updated_at'))
        )
      default:
        return items  
    }
  }

/* not currently used
const getItems = (state) => state.get('items')
export const getSortedItems = createSelector(
  [ getSortParameter, getItems ],
  (sortParameter, items) => {
    return sortItems(sortParameter, items)
  }
)
*/

export const getSortedItemsFilteredByKeyword = createSelector (
  [ getSortParameter, getItemsFilteredByKeyword ],
  (sortParameter, items) => {
    return sortItems(sortParameter, items)
  }
)
