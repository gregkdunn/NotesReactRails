import { createSelector } from 'reselect'
import * as selectors from './selectorTypes'
const getSortParameter = (state) => state.get('sortBy')
const getItems = (state) => state.get('items')

export const getSortedNotes = createSelector(
  [ getSortParameter, getItems ],
  (sortParameter, items) => {
    switch (sortParameter) {
      case selectors.SORT_BY_ID:
        return items.sort(
          (a, b) => a.get('id') > b.get('id')
        )
      case selectors.SORT_BY_TITLE:
        return items.sort(
          (a, b) => a.get('title').localeCompare(b.get('title'))
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
)