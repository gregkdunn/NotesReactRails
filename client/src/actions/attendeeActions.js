import * as types from './action-types';

export const addAttendee = (appointment, attendee) => {
    return {
        type: types.ADD_ATTENDEE,
        appointment,
        attendee
    };
}
