import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notesActions'
import { saveNote } from '../actions/notesActions'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import uuid from 'uuid'

let NoteInput = ({ dispatch }) => {
    const submitNote = () => {
        console.log('NoteInput.submitNote');

        const apptNumber = 1

        const titleElement = document.getElementById('title');
        const contentElement = document.getElementById('content');
        
        if(!titleElement.value && !contentElement.value) {
            return 
        }

        const noteParams = {
            title: titleElement.value,
            content: contentElement.value,
            uuid: uuid.v1()
        };        
        dispatch(addNote(apptNumber, noteParams));

        //TODO value for appointment id
        titleElement.value = '';
        contentElement.value = '';

        dispatch(saveNote(apptNumber, noteParams));
    };

   const textFieldStyle = {
        display:'block'
   };

   const buttonStyle = {
        float:'right'
   }



    return (
        <Card>
            <CardText>
            <form onSubmit={e => {e.preventDefault(); submitNote();}} id="noteForm">
                <TextField floatingLabelText="Title" id="title" style={textFieldStyle}/>
                <TextField floatingLabelText="Note" id="content" style={textFieldStyle}/>
                <RaisedButton label="Add Note" primary={true}  style={buttonStyle} onClick={e => {submitNote();}}/>
            </form>
            </CardText>
        </Card>
    );
};


NoteInput.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
};
NoteInput.InitialState = {
    title: '',
    content: ''
};

NoteInput = connect()(NoteInput);

export default NoteInput;
