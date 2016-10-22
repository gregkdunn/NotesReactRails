import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { closeEditNote, updateNote } from '../actions/notesActions'
import {Card, CardTitle, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

let NoteForm = ({note, dispatch}) => {
    const listItemStyle={margin:'8px',float:'left'};
    const cardStyle = {width:'320px'};
    const textFieldStyle = {display:'block', margin: '8px'};
    const idStyle ={float:'right',margin:'8px', fontSize:'10px'}

    let titleInput, contentInput

    const cancelClick = () => {
        console.log('NoteInput.cancelClick');
        dispatch(closeEditNote(note));
    };
    const updateClick = () => {
        console.log('NoteInput.updateClick');
        console.log(titleInput);
        const updateParams = {
            title: titleInput.getValue(),
            content: contentInput.getValue()
        };        

        dispatch(updateNote(note, updateParams));
    };



    return (
        <li style={listItemStyle}>
       		<Card style={cardStyle}>
             <span style={idStyle}>{note.get('id')}</span>
       			 <CardTitle title='edit'/>
                <TextField floatingLabelText="Title" ref={node => {titleInput = node}} style={textFieldStyle} defaultValue={note.get('title')}/>
                <TextField floatingLabelText="Note" ref={node => {contentInput = node}}  style={textFieldStyle} defaultValue={note.get('content')}/>
             <CardActions>
              <FlatButton label="Save" primary={true} onClick={e => {updateClick()}}/>
              <FlatButton label="Cancel" secondary={true} onClick={e => {cancelClick()}} />
             </CardActions>
       		</Card>
        </li>
    );
};

NoteForm.propTypes = {
    note: PropTypes.instanceOf(Immutable.Map).isRequired
};


NoteForm = connect()(NoteForm);
export default NoteForm;
