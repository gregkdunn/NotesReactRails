import React, { PropTypes } from 'react'
import Note from './Note';

const NoteList = ({ notes }) => {
    var listStyle = {listStyleType:'none'};


    return (
        <ul style={listStyle}>
            {
                notes.map((note) =>
                    <Note note={note} />
                )
            }
        </ul>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array
};


export default NoteList;
