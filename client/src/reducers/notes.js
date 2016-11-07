import * as types from '../constants/actionTypes'
import * as selectors from '../constants/selectorTypes'
import Immutable from 'immutable'
import { tryListItemUpdate } from '../helpers/lists'

const initialState = Immutable.Map({
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
    }
)

const defaultNote = {
                   'uuid': 0,
                   'id': 0,
                   'title': '',
                   'content': '',
                   'created_at': '', 
                   'updated_at': '',
                   'isEditing': false,
                   'isSaving': false,
                   'isDeleting': false
                 }

const createNote = (note) => {
    return Immutable.fromJS(Object.assign({}, defaultNote, note));
}
const createNotes = (notes) => {
    let newNotes = [];
    for (let note of notes) {
       newNotes.push(createNote(note))
    }   
    return Immutable.fromJS(newNotes)
}

const notes = (state = initialState, action) => {

    //console.log(' >>>State:' + state)

    switch (action.type) {
        //FRONTEND ACTIONS
        case types.ADD_NOTE:
            console.log('REDUCER:ADD_NOTE')
            const newNote = createNote(action.note)
            console.log('newNote:' + newNote)
            console.log('State:' + state)
            return  state.updateIn(['items'], list => list.push(newNote));
        case types.DELETE_NOTE:
            console.log('REDUCER:DELETE_NOTE')
            return state.updateIn(['items'], list => list.filterNot(note => note.get('id') === action.note.get('id')))
        case types.EDIT_NOTE: 
            console.log('REDUCER:EDIT_NOTE')
            return tryListItemUpdate(state, 'items', 'id', action.note)
        
        //TOGGLE EDIT
        case types.OPEN_EDIT_NOTE:
            console.log('REDUCER:OPEN_EDIT_NOTE')        
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isEditing':true})
        case types.CLOSE_EDIT_NOTE:
            console.log('REDUCER:CLOSE_EDIT_NOTE')            
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isEditing':false})
        
        //FETCH
        case types.FETCH_NOTES_REQUEST:
            console.log('REDUCER:FETCH_NOTES_REQUEST')
            return state.set('isFetching', true)
        case types.FETCH_NOTES_SUCCESS:
            console.log('REDUCER:FETCH_NOTES_SUCCESS')

            state = state.set('items', createNotes(action.notes))
            return state.set('isFetching', false)
        case types.FETCH_NOTES_ERROR:
            console.log('REDUCER:FETCH_NOTE_ERROR')
            return state.set('isFetching', false)  
        
        //SAVE
        case types.SAVE_NOTE_SUCCESS:
            console.log('REDUCER:SAVE_NOTES_SUCCESS')
            return tryListItemUpdate(state, 'items', 'uuid', action.note, Object.assign({}, action.response, {'isSaving': false}))
        case types.SAVE_NOTE_ERROR:
            console.log('REDUCER:SAVE_NOTE_ERROR')
            return tryListItemUpdate(state, 'items', 'uuid', action.note, {'isSaving': false})
        case types.SAVE_NOTE_REQUEST:
            console.log('REDUCER:SAVE_NOTE_REQUEST')
            return tryListItemUpdate(state, 'items', 'uuid', action.note, {'isSaving': true})
        
        //UPDATE
        case types.UPDATE_NOTE_SUCCESS:
            console.log('REDUCER:UPDATE_NOTE_SUCCESS')
            return tryListItemUpdate(state, 'items', 'id', action.note, Object.assign({}, action.response, {'isSaving': false, 'isEditing': false}))
        case types.UPDATE_NOTE_ERROR:
            console.log('REDUCER:UPDATE_NOTE_ERROR')
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isSaving': false})
        case types.UPDATE_NOTE_REQUEST:
            console.log('REDUCER:UPDATE_NOTE_REQUEST')
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isSaving': true})             
        
        //REMOVE
        case types.REMOVE_NOTE_SUCCESS:
            console.log('REDUCER:REMOVE_NOTE_SUCCESS')
            return tryListItemUpdate(state, 'items', 'id', action.note, Object.assign({}, action.response, {'isDeleting': false}))
        case types.REMOVE_NOTE_ERROR:
            console.log('REDUCER:REMOVE_NOTE_ERROR')
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isDeleting': false})
        case types.REMOVE_NOTE_REQUEST:
            console.log('REDUCER:REMOVE_NOTE_REQUEST')
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isDeleting': true})   

        //SORT/FILTER
        case types.SORT_NOTES:
            console.log('REDUCER:SORT_NOTES')
            return state.set('sortBy', action.sortBy)
        case types.FILTER_NOTES:
            console.log('REDUCER:FILTER_NOTES')
            console.dir(action)
            return state.set('filterKeywords', action.filterKeywords)

        //PENDING - NEW NOTES FROM FORM
        case types.PENDING_UPDATE:
            console.log('REDUCER:PENDING_UPDATE')
            return state.set('pending', Object.assign({}, state.get('pending'), action.update))


        default:
            return state;
    }
};

export default notes;