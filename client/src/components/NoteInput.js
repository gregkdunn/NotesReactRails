import React, { PropTypes } from 'react'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import uuid from 'uuid'

//Controlled Form Conponent Example
//- state changed on keyup

let NoteInput = ({pending, pendingUpdate, addNote, saveNote}) => {

    const resetForm = () => {
        pendingUpdate({'title': '', 'content': ''})
   }

    const submitNote = () => {
        console.log('NoteInput.submitNote');

        if(!pending.title && !pending.content) {
            return 
        }

        const uuidVal = uuid.v1();
        const noteParams = {
            title: pending.title,
            content: pending.content,
            uuid: uuidVal
        };  

        addNote(noteParams)
        saveNote(noteParams)

        resetForm()
    }

   const cardStyle = {width:'320px', float:'left',margin:'8px'};
   const textFieldStyle = {display:'block'}
   const buttonStyle = {float:'none'}

   let onChangeHandler = (evt) => {
        console.log('NoteInput.onChangeHandler')
        console.dir(evt)
        console.log('pending')
        console.dir(pending)

        const field = evt.target
        if (field) {
            let update = {}
            update[field.name] = field.value
            pendingUpdate(update)
        }
   }

    return (
        <Card style={cardStyle}>
                <CardHeader
                  title="New Note"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
            <form onSubmit={e => {e.preventDefault(); submitNote();}} id="noteForm">
            <CardText>
                <TextField floatingLabelText="Title" value={pending.title} style={textFieldStyle} name="title" onChange={onChangeHandler} />
                <TextField floatingLabelText="Note" value={pending.content} style={textFieldStyle} name="content" onChange={onChangeHandler} />
            </CardText>
            <CardActions>    
                <RaisedButton label="Add Note" primary={true}  style={buttonStyle} onClick={e => {submitNote();}}/>
            </CardActions>
            </form>
        </Card>
    );
};

NoteInput.PropTypes = {
    pending : PropTypes.shape({
        title: React.PropTypes.string,
        content: React.PropTypes.string
    }).isRequired,
    pendingUpdate: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired
}

export default NoteInput;
