import React, {PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {yellow100} from 'material-ui/styles/colors'

let Note = ({note, onEditOpenHandler, onDeleteHandler}) => {
    
    const deleteClick = () => {
        console.log('NoteInput.deleteNote');
        onDeleteHandler(note)
    };
    const editClick = () => {
        console.log('NoteInput.updateNote');
        onEditOpenHandler(note)
    };

    return (
       		<Card className={(note.get('isSaving') ? 'dim ' : '') + 'ma2 fl w-30-ns w-90 bg-light-yellow'}>
             <span className="idDisplay fr pa2 f6 gray">{note.get('id')}</span>
       			 <CardTitle title={note.get('title')}/>
       			 <CardText>{note.get('content')}</CardText>
             <CardActions>
              <FlatButton label="Edit" primary={true} onClick={e => {editClick()}}/>
              <FlatButton label="Delete" secondary={true} onClick={e => {deleteClick()}} />
             </CardActions>
       		</Card>
    );
};

Note.propTypes = {
    note: PropTypes.shape({
        id: React.PropTypes.number,
        title: React.PropTypes.string,
        content: React.PropTypes.string
    }).isRequired,
    onEditOpenHandler:PropTypes.func.isRequired,
    onDeleteHandler:PropTypes.func.isRequired
};

export default Note;
