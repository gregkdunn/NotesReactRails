import {combineReducers} from 'redux-immutable';
import notes from './notes';
import undoable, {limit, actionFilter, historyFilter} from 'redux-undo-immutable';

const rootReducer = combineReducers({
    notes: undoable(notes,
    limit: 0, 
    actionFilter: () => true,
    historyFilter: () => true
    )
});

export default rootReducer;