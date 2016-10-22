import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import Note from './Note'
import NoteForm from './NoteForm'

const NoteList = ({ notes }) => {
    var listStyle = {listStyleType:'none'};

    return (
        <ul style={listStyle}>
            {notes.map(note => {
            	if(note.get('isEditing')) { 
            		return <NoteForm key={note.get('id')} note={note} />
            	} else {
            		return <Note key={note.get('id')} note={note} />
            	}

            })}           
        </ul>
    );
};

NoteList.propTypes = {
    notes: PropTypes.instanceOf(Immutable.List).isRequired
};

export default NoteList;
