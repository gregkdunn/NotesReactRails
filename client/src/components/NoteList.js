import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import Note from './Note'
import NoteForm from './NoteForm'

const NoteList = ({notes, onDeleteHandler, onEditCloseHandler, onEditOpenHandler, onUpdateHandler}) => {
    var listStyle = {listStyleType:'none'};

    return (
        <ul style={listStyle}>
            {notes.map(note => {
            	if(note.get('isEditing')) { 
            		return <NoteForm key={note.get('id')} note={note} onEditCloseHandler={onEditCloseHandler} onUpdateHandler={onUpdateHandler} />
            	} else {
            		return <Note key={note.get('id')} note={note} onDeleteHandler={onDeleteHandler} onEditOpenHandler={onEditOpenHandler}/>
            	}
            })}           
        </ul>
    );
};

NoteList.propTypes = {
    notes: PropTypes.instanceOf(Immutable.List).isRequired,
    onDeleteHandler:PropTypes.func.isRequired,
    onEditCloseHandler:PropTypes.func.isRequired,
    onEditOpenHandler:PropTypes.func.isRequired,
    onUpdateHandler:PropTypes.func.isRequired
};

export default NoteList;
