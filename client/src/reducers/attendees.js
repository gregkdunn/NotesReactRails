import * as types from '../actions/action-types';

const initialState = [];


const attendee = (state, action) => {
    switch (action.type) {
        case types.ADD_ATTENDEE:
            return {
                name: action.name,
                phone: action.phone
            }
        default :
            return state;
    }
};

const attendees = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ATTENDEE:
            return [
                ...state,
                attendee(undefined, action.attendee)
            ]
        default:
            return state;
    }
};

export default attendees;
