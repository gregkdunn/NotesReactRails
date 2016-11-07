import React, {PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {yellow100} from 'material-ui/styles/colors'

let Note = ({note, onEditOpenHandler, onDeleteHandler}) => {
    const listItemStyle={margin:'8px',float:'left'};
    const cardStyle = {width:'320px', backgroundColor: yellow100};
    const idStyle ={float:'right',margin:'8px', fontSize:'10px'}

    const deleteClick = () => {
        console.log('NoteInput.deleteNote');
        onDeleteHandler(note)
    };
    const editClick = () => {
        console.log('NoteInput.updateNote');
        onEditOpenHandler(note)
    };

    return (
        <li style={listItemStyle} className={(note.get('isSaving') ? 'dim' : '')}>
       		<Card style={cardStyle}>
             <span className="idDisplay" style={idStyle}>{note.get('id')}</span>
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
    note: PropTypes.shape({
        id: React.PropTypes.number,
        title: React.PropTypes.string,
        content: React.PropTypes.string
    }).isRequired,
    onEditOpenHandler:PropTypes.func.isRequired,
    onDeleteHandler:PropTypes.func.isRequired
};

export default Note;
