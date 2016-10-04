import * as types from './action-types';

export const addNote = (appointment, note) => {

    let created = Date();
    return {
        type: types.ADD_NOTE,
        appointment,
        note,
        created
    };
}
