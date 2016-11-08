import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import Note from './Note'
import NoteForm from './NoteForm'

const NoteList = ({notes, onDeleteHandler, onEditHandler, onEditCloseHandler, onEditOpenHandler, onRemoveHandler, onUpdateHandler}) => {

    return (
        <div className='list'>
            {notes.map(note => {
            	if(note.get('isEditing')) { 
            		return <NoteForm key={note.get('id')} note={note} editClose={onEditCloseHandler} editNote={onEditHandler} updateNote={onUpdateHandler} />
            	} else {
            		return <Note key={note.get('id')} note={note} onDeleteHandler={onDeleteHandler} onEditOpenHandler={onEditOpenHandler} onRemoveHandler={onRemoveHandler}/>
            	}
            })}           
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.instanceOf(Immutable.List).isRequired,
    onDeleteHandler:PropTypes.func.isRequired,
    onEditCloseHandler:PropTypes.func.isRequired,
    onEditOpenHandler:PropTypes.func.isRequired,
    onRemoveHandler:PropTypes.func.isRequired,
    onUpdateHandler:PropTypes.func.isRequired
};

export default NoteList;
