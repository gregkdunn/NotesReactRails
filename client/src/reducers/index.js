import {combineReducers} from 'redux';
import attendees from './attendees';
import notes from './notes';

const rootReducer = combineReducers({
    attendees,
    notes
});

export default rootReducer;