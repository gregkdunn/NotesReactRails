import React, {PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {green100, yellow100, red100} from 'material-ui/styles/colors'

let Note = ({note, onEditOpenHandler, onDeleteHandler, onRemoveHandler}) => {

    const deleteClick = () => {
        console.log('NoteInput.deleteNote');
        onDeleteHandler(note)
        onRemoveHandler(note)
    };
    const editClick = () => {
        console.log('NoteInput.updateNote');
        onEditOpenHandler(note)
    };

    const colorForImportance = (val) => {
        switch(val) {
            case 1:
                return green100
            case 3:
                return red100
            default:
                return yellow100
        }
    }
    const labelForImportance = (val) => {
        switch(val) {
            case 1:
                return 'low'
            case 3:
                return 'high'
            default:
                return 'normal'
        }

    }

    return (
       		<Card style={{minHeight:'280px', backgroundColor:colorForImportance(note.get('importance'))}} className={(note.get('isSaving') ? 'dim ' : '') + 'ma2 fl w-30-ns w-90 bg-light-yellow'}>
             <span className="idDisplay fr pa2 f6 gray">{note.get('id')}</span>
       			 <CardTitle title={note.get('title') }/>
       			 <CardText style={{height: '140px'}}>{note.get('content')}</CardText>
                 <div className="mh3">Important : {labelForImportance(note.get('importance'))}</div>  
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
    onDeleteHandler:PropTypes.func.isRequired,
    onRemoveHandler:PropTypes.func.isRequired
};

export default Note;
