import * as types from '../actions/action-types';

const initialState = [];


const note = (state, action) => {
    switch (action.type) {
        case types.ADD_NOTE:
            let note =  {
                title: action.note.title,
                message: action.note.message,
                created: action.created
            };

            console.log('note: ' + note);
            return note;
        default :
            return state;
    }
};

const notes = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NOTE:
            let notes =  state.slice(0);
            let newNote = note(undefined, action);
            console.log('newNote: '+ newNote);

            notes.push(newNote);

            console.log('notes: ' + notes);
            return notes;

        default:
            return state;
    }
};

export default notes;

