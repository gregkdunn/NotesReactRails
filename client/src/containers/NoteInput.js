import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notesActions'
import { saveNote } from '../actions/notesActions'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import uuid from 'uuid'

let NoteInput = ({ dispatch }) => {
    let titleInput, contentInput

    const submitNote = () => {
        console.log('NoteInput.submitNote');
        console.dir(titleInput)


        if(!titleInput.getValue() && !contentInput.getValue()) {
            return 
        }
        const uuidVal = uuid.v1();
        const noteParams = {
            title: titleInput.getValue(),
            content: contentInput.getValue(),
            uuid: uuidVal
        };        
        dispatch(addNote(noteParams));

        titleInput.value = '';
        contentInput.value = '';

        dispatch(saveNote(noteParams));
    };

   const textFieldStyle = {
        display:'block'
   };

   const buttonStyle = {
       //float:'right'
   }

    return (
        <Card>
            
            <form onSubmit={e => {e.preventDefault(); submitNote();}} id="noteForm">
            <CardTitle title="New Note"/>
            <CardText>
                <TextField floatingLabelText="Title" ref={node => {titleInput = node}} style={textFieldStyle}/>
                <TextField floatingLabelText="Note" ref={node => {contentInput = node}} style={textFieldStyle}/>
            </CardText>
            <CardActions>    
                <RaisedButton label="Add Note" primary={true}  style={buttonStyle} onClick={e => {submitNote();}}/>
            </CardActions>
            </form>
            
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
