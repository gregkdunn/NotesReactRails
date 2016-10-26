 import * as types from '../actions/actionTypes'
import Immutable from 'immutable'
//import {logState} from '../helpers/logs'
import { tryListItemUpdate } from '../helpers/lists'
import * as selectors from '../selectors/selectorTypes'

const initialState = Immutable.Map({
        items:Immutable.List(), 
        selectedAppt: Immutable.Map({id:1, name:"the one"}),
        isFetching: true,
        lastUpdated: null,
        sortBy: selectors.SORT_BY_TITLE
    }
);

const defaultNote = {
                   'uuid': 0,
                   'id': 0,
                   'title': '',
                   'content': '',
                   'created_at': '', 
                   'updated_at': '',
                   'isEditing': false,
                   'isSaving': false
                 };

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
    switch (action.type) {
        case types.ADD_NOTE:
            console.log('REDUCER:ADD_NOTE');
            const newNote = createNote(action.note)
            return  state.updateIn(['items'], list => list.push(newNote));
        case types.DELETE_NOTE:
            console.log('REDUCER:DELETE_NOTE');
            return state.updateIn(['items'], list => list.filterNot(note => note.get('id') === action.note.get('id')));
        case types.EDIT_NOTE: 
            console.log('REDUCER:EDIT_NOTE');
            return tryListItemUpdate(state, 'items', 'id', action.note, action.note)
        //TOGGLE EDIT
        case types.OPEN_EDIT_NOTE:
            console.log('REDUCER:OPEN_EDIT_NOTE');        
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isEditing':true})
        case types.CLOSE_EDIT_NOTE:
            console.log('REDUCER:CLOSE_EDIT_NOTE');            
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isEditing':false})
        //FETCH
        case types.FETCH_NOTES_REQUEST:
            console.log('REDUCER:FETCH_NOTES_REQUEST');
            return state.set('isFetching', true);
        case types.FETCH_NOTES_SUCCESS:
            console.log('REDUCER:FETCH_NOTES_SUCCESS');
            state = state.set('items', createNotes(action.notes));
            return state.set('isFetching', false);
        case types.FETCH_NOTES_ERROR:
            console.log('REDUCER:FETCH_NOTE_ERROR');
            return state.set('isFetching', false);  
        //SAVE
        case types.SAVE_NOTE_SUCCESS:
            console.log('REDUCER:SAVE_NOTES_SUCCESS');
            return tryListItemUpdate(state, 'items', 'uuid', action.note, Object.assign({}, action.response,{'isSaving': false}))
        case types.SAVE_NOTE_ERROR:
            console.log('REDUCER:SAVE_NOTE_ERROR');
            return tryListItemUpdate(state, 'items', 'uuid', action.note, {'isSaving': false})
        case types.SAVE_NOTE_REQUEST:
            console.log('REDUCER:SAVE_NOTE_REQUEST');
            return tryListItemUpdate(state, 'items', 'uuid', action.note, {'isSaving': true})
        //UPDATE
        case types.UPDATE_NOTE_SUCCESS:
            console.log('REDUCER:UPDATE_NOTE_SUCCESS');
            return tryListItemUpdate(state, 'items', 'id', action.note, Object.assign({}, action.response,{'isSaving': false, 'isEditing': false}))
        case types.UPDATE_NOTE_ERROR:
            console.log('REDUCER:UPDATE_NOTE_ERROR');
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isSaving': false})
        case types.UPDATE_NOTE_REQUEST:
            console.log('REDUCER:UPDATE_NOTE_REQUEST');
            return tryListItemUpdate(state, 'items', 'id', action.note, {'isSaving': true})             
        default:
            return state;
    }
};

export default notes;