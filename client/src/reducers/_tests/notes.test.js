import Immutable from 'immutable'
import reducer from '../notes'
import * as types from '../../constants/actionTypes'
import * as selectors from '../../constants/selectorTypes'

describe('notes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).toJS()
    ).toEqual(
      Immutable.Map({
        items:Immutable.List(), 
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE,
        sortValues: [
          {order:1, value:selectors.SORT_BY_ID, title:"Id"},
	        {order:2, value:selectors.SORT_BY_TITLE, title:"Title"},
	        {order:3, value:selectors.SORT_BY_CREATED_DATE, title:"Created"},
	        {order:4, value:selectors.SORT_BY_UPDATED_DATE, title:"Updated"}
        ],
        filterKeywords: '',
        pending: {
            title: '',
            content: ''
        }
      }).toJS()
    )
  })   
  
  it('should handle ADD_NOTE', () => {
    //first
    expect(
      reducer( Immutable.Map({
        items:Immutable.List(), 
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE,
        sortValues: [
          {order:1, value:selectors.SORT_BY_ID, title:"Id"},
	        {order:2, value:selectors.SORT_BY_TITLE, title:"Title"},
	        {order:3, value:selectors.SORT_BY_CREATED_DATE, title:"Created"},
	        {order:4, value:selectors.SORT_BY_UPDATED_DATE, title:"Updated"}
        ],        
        filterKeywords: '',
        pending: {
            title: '',
            content: ''
        }}), {
        type: types.ADD_NOTE,
        note: {'title': 'Run the tests', 'content': 'alright', 'uuid': 1}
      }).toJS()
    ).toEqual(
      Immutable.Map({
        items:Immutable.List(
          [{
            'uuid': 1,
            'id': 0,
            'title': 'Run the tests',
            'content': 'alright',
            'created_at': '', 
            'updated_at': '',
            'isEditing': false,
            'isSaving': false,
            'isDeleting': false
          }]
        ), 
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE,
        sortValues: [
          {order:1, value:selectors.SORT_BY_ID, title:"Id"},
	        {order:2, value:selectors.SORT_BY_TITLE, title:"Title"},
	        {order:3, value:selectors.SORT_BY_CREATED_DATE, title:"Created"},
	        {order:4, value:selectors.SORT_BY_UPDATED_DATE, title:"Updated"}
        ],        
        filterKeywords: '',
        pending: {
            title: '',
            content: ''
        }
      }).toJS()
    )  
    //second
    expect(
      reducer(
        Immutable.Map({
        items:Immutable.List(
          [{
            'uuid': 1,
            'id': 0,
            'title': 'Run the tests',
            'content': 'alright',
            'created_at': '', 
            'updated_at': '',
            'isEditing': false,
            'isSaving': false,
            'isDeleting': false
          }]
        ), 
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE,
        sortValues: [
          {order:1, value:selectors.SORT_BY_ID, title:"Id"},
	        {order:2, value:selectors.SORT_BY_TITLE, title:"Title"},
	        {order:3, value:selectors.SORT_BY_CREATED_DATE, title:"Created"},
	        {order:4, value:selectors.SORT_BY_UPDATED_DATE, title:"Updated"}
        ],        
        filterKeywords: '',
        pending: {
            title: '',
            content: ''
        }
      }),
        {
          type: types.ADD_NOTE,
          note: {'title': 'Taco Tuesday', 'content': 'Always Awesome', 'uuid': 2}
        }
      ).toJS()
    ).toEqual(
      Immutable.Map({
        items:Immutable.List(
          [{
            'uuid': 1,
            'id': 0,
            'title': 'Run the tests',
            'content': 'alright',
            'created_at': '', 
            'updated_at': '',
            'isEditing': false,
            'isSaving': false,
            'isDeleting': false
          },
          {
            'uuid': 2,
            'id': 0,
            'title': 'Taco Tuesday',
            'content': 'Always Awesome',
            'created_at': '', 
            'updated_at': '',
            'isEditing': false,
            'isSaving': false,
            'isDeleting': false
          }]
        ), 
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE,
        sortValues: [
          {order:1, value:selectors.SORT_BY_ID, title:"Id"},
	        {order:2, value:selectors.SORT_BY_TITLE, title:"Title"},
	        {order:3, value:selectors.SORT_BY_CREATED_DATE, title:"Created"},
	        {order:4, value:selectors.SORT_BY_UPDATED_DATE, title:"Updated"}
        ],        
        filterKeywords: '',
        pending: {
            title: '',
            content: ''
        }
      }).toJS()
    )
  })

})