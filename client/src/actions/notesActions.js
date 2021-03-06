import * as types from '../constants/actionTypes'
import * as requests from '../constants/requests'
import { checkStatus, parseJSON } from '../helpers/async'

//NOTES
export const sortNotes = (sortBy) => {
    console.log('SORT_NOTES:');
    return {
      type: types.SORT_NOTES,
      sortBy
    }
}

export const filterNotes = (filterKeywords) => {
  console.log('FILTER_NOTES:')
  return {
      type: types.FILTER_NOTES,
      filterKeywords
  }
}


//read
const fetchNotesRequest = () => {
    console.log('FETCH_NOTES_REQUEST:');
    return {
      type: types.FETCH_NOTES_REQUEST
    };
}

const fetchNotesSuccess = (json) => {
  console.log('FETCH_NOTES_SUCCESS:');
    return {
      type: types.FETCH_NOTES_SUCCESS,
      notes: json,
      received: Date.now()
    };
}

const fetchNotesError = (error) => {
  console.log('FETCH_NOTES_ERROR:');
    return {
      type: types.FETCH_NOTES_ERROR,  
      error: error
    };
}

//thunk example
export const fetchNotes = () => dispatch => {
  console.log('FETCH_NOTES:');
  dispatch(fetchNotesRequest());
  return fetch(requests.notesURL, requests.getHeaders)
    .then((response) => {
      console.log('FETCH_NOTES:CHECK_STATUS')
      console.dir(response)
      return checkStatus(response)
    })
    .then((response) => {
      console.log('FETCH_NOTES:PARSE_JSON')
      console.dir(response)
      return parseJSON(response)
    })
    .then((responseJSON) => {
      console.log('FETCH_NOTES:SUCCESS');
      console.dir(responseJSON)
      dispatch(fetchNotesSuccess(responseJSON))
    })
    .catch((responseError) => {   
      console.log('FETCH_NOTES:ERROR');
      console.log(responseError);
      dispatch(fetchNotesError(responseError))
    })
}

const shouldFetchNotes = (state) => {
console.log('SHOULD_REFRESH_NOTES');  
  const notes = state.notes;
  if (!notes || !notes.items) {
    console.log('SHOULD_REFRESH_NOTES:NO_CONTENT'); 
    return true
  }
  if (notes.isFetching) {
    console.log('SHOULD_REFRESH_NOTES:ALREADY_FETCHING'); 
    return false
  }
  console.log('SHOULD_REFRESH_NOTES:DEFAULT');  
  return true
}

export const fetchNotesIfNeeded = () => (dispatch, getState) => {
  console.log('FETCH_NOTES_IF_NEEDED');
  if (shouldFetchNotes(getState())) {
    console.log('FETCH_NOTES_IF_NEEDED: YES');
    return dispatch(fetchNotes())
  } else {
    console.log('FETCH_NOTES_IF_NEEDED: NO');
  }
}



//NOTE
//TODO in the future, send date to actionCreator
export const addNote = (note) => {
    console.log('ADD_NOTE:');
    return {
      type: types.ADD_NOTE,
      note,
      created: Date.now()
    };
}

export const deleteNote = (note) => {
    console.log('DELETE_NOTE:');
    return {
      type: types.DELETE_NOTE,
      note
    };
}

export const editNote = (note) => {
    console.log('EDIT_NOTE:');
    return {
      type: types.EDIT_NOTE,
      note,
      edited: Date.now()
    };
}

export const openEditNote = (note) => {
    console.log('OPEN_EDIT_NOTE:');
    return {
      type: types.OPEN_EDIT_NOTE,
      note
    }
}

export const closeEditNote = (note) => {
    console.log('CLOSE_EDIT_NOTE:');
    return {
      type: types.CLOSE_EDIT_NOTE,
      note
    }
}

//create
const saveNoteRequest = (note) => {
  console.log('SAVE_NOTE_REQUEST:');  
    return {
      type: types.SAVE_NOTE_REQUEST,
      note: note
    };
}

const saveNoteSuccess = (note, json) => {
  console.log('SAVE_NOTE_SUCCESS:');    
    return {
      type: types.SAVE_NOTE_SUCCESS,
      note: note,
      response: json,
      received: Date.now()
    };
}

const saveNoteError = (note, error) => {
  console.log('SAVE_NOTE_ERROR:');
    return {
      type: types.SAVE_NOTE_ERROR,
      note: note,  
      error: error
    };
}

export const saveNote = (note) => (dispatch) => {
    console.log('SAVE_NOTE:');
    dispatch(saveNoteRequest(note));
    const postNote = requests.postHeadersWithBodyObject(note);
    return fetch(requests.notesURL, postNote)
      .then((response) => {
        return checkStatus(response)
      })
      .then((response) => {
        return parseJSON(response)
      })
      .then((responseJSON) => {
        console.log('SAVE_NOTE:SUCCESS');
        console.dir(responseJSON);
        dispatch(saveNoteSuccess( note, responseJSON))
        }
      )
      .catch((responseError) => {   
        console.log('SAVE_NOTE:ERROR');
        console.dir(responseError);
        dispatch(saveNoteError( note, responseError))
        }
      )
}

//delete
const removeNoteRequest = (note) => {
  console.log('REMOVE_NOTE_REQUEST:');  
    return {
      type: types.REMOVE_NOTE_REQUEST,
      note: note
    };
}

const removeNoteSuccess = (note, json) => {
  console.log('REMOVE_NOTE_SUCCESS:');    
    return {
      type: types.REMOVE_NOTE_SUCCESS,
      note: note,
      response: json,
      received: Date.now()
    };
}

const removeNoteError = (note, error) => {
  console.log('REMOVE_NOTE_ERROR:');
    return {
      type: types.REMOVE_NOTE_ERROR,
      note: note,  
      error: error
    };
}

export const removeNote = (note) => (dispatch) => {
    console.log('REMOVE_NOTE:');
    dispatch(removeNoteRequest(note));
    return fetch(requests.noteURL(note), requests.deleteHeaders)
      .then((response) => {
        return checkStatus(response)
      })
      .then((response) => {
        return parseJSON(response)
      })
      .then((responseJSON) => {
        console.log('REMOVE_NOTE:SUCCESS');
        console.dir(responseJSON);
        dispatch(removeNoteSuccess(note, responseJSON))
        }
      )
      .then(() => {
        console.log('REMOVE_NOTE:DELETE NOTE');
        dispatch(deleteNote(note))
        }
      )
      .catch((responseError) => {   
        console.log('REMOVE_NOTE:ERROR');
        console.dir(responseError);
        dispatch(removeNoteError(note, responseError))
        }
      )
}

//update
const updateNoteRequest = (note) => {
  console.log('UPDATE_NOTE_REQUEST:');  
    return {
      type: types.UPDATE_NOTE_REQUEST,
      note: note
    };
}

const updateNoteSuccess = (note, json) => {
  console.log('UPDATE_NOTE_SUCCESS:');    
    return {
      type: types.UPDATE_NOTE_SUCCESS,
      note: note,
      response: json,
      received: Date.now()
    };
}

const updateNoteError = ( note, error) => {
  console.log('UPDATE_NOTE_ERROR:');
    return {
      type: types.UPDATE_NOTE_ERROR,
      note: note,  
      error: error
    };
}

export const updateNote = (note, updateParams) => (dispatch) => {
    console.log('UPDATE_NOTE:')
    console.dir(updateParams)

    dispatch(updateNoteRequest(note));
    const putNote = requests.putHeadersWithBodyObject(updateParams);
    return fetch(requests.noteURL(note), putNote)
      .then((response) => {
        return checkStatus(response)
      })
      .then((response) => {
        return parseJSON(response)
      })
      .then((responseJSON) => {
        console.log('UPDATE_NOTE:SUCCESS');
        console.dir(responseJSON);
        dispatch(updateNoteSuccess( note, responseJSON))
        }
      )
      .catch((responseError) => {   
        console.log('UPDATE_NOTE:ERROR');
        console.dir(responseError);
        dispatch(updateNoteError( note, responseError))
        }
      )
}

//pending - update for new notes
export const pendingUpdate = (update) => {
  console.log('PENDING_UPDATE:');  
    return {
      type: types.PENDING_UPDATE,
      update
    };
}

