import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { removeNote, openEditNote } from '../actions/notesActions'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

let Note = ({note, dispatch}) => {
    const listItemStyle={margin:'8px',float:'left'};
    const cardStyle = {width:'320px'};
    const idStyle ={float:'right',margin:'8px', fontSize:'10px'}

    const deleteClick = () => {
        console.log('NoteInput.deleteNote');

        dispatch(removeNote(note));
    };
    const editClick = () => {
        console.log('NoteInput.updateNote');
  
        dispatch(openEditNote(note));
    };

    return (
        <li style={listItemStyle}>
       		<Card style={cardStyle}>
             <span style={idStyle}>{note.get('id')}</span>
       			 <CardTitle title={note.get('title')}/>
       			 <CardText>{note.get('content')}</CardText>
             <CardActions>
              <FlatButton label="Edit" primary={true} onClick={e => {editClick()}}/>
              <FlatButton label="Delete" secondary={true} onClick={e => {deleteClick()}} />
             </CardActions>
       		</Card>
        </li>
    );
};

Note.propTypes = {
    note: PropTypes.instanceOf(Immutable.Map).isRequired
};


Note = connect()(Note);
export default Note;
