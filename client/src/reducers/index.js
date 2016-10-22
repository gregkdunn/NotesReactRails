import {combineReducers} from 'redux-immutable';
import notes from './notes';

const rootReducer = combineReducers({
    notes
});

export default rootReducer;