import {combineReducers} from 'redux-immutable'
import notes from './notes'
import panels from './panels'
//import * as types from '../constants/actionTypes'
import undoable, {limit/*, actionFilter, historyFilter*/} from 'redux-undo-immutable';

/*
const undoFilter = (action, prev, current) => {
    console.log('actionFilter')
    console.dir(action)
    return ([types.PENDING_UPDATE, types.SORT_NOTES].indexOf(action.type) === -1)  
}

const histFilter = (action) => {
    console.log('historyFilter')
    return ([types.PENDING_UPDATE, types.SORT_NOTES].indexOf(action.type) === -1)  
}
*/
const rootReducer = combineReducers({
    notes: undoable(notes,
    limit: 0//, 
    //actionFilter: undoFilter,
    //historyFilter: histFilter
    ),
    panels
});

export default rootReducer;