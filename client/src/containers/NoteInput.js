import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notesActions'
import { pendingUpdate, saveNote } from '../actions/notesActions'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import uuid from 'uuid'


let NoteInput = ({ pending, dispatch }) => {

    const resetForm = () => {
        dispatch(pendingUpdate({'title': '', 'content': ''}));
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

        dispatch(addNote(noteParams))

        dispatch(saveNote(noteParams))

        resetForm()
    }

   const cardStyle = {width:'320px', float:'left',margin:'8px'};

   const textFieldStyle = {
        display:'block'
   }

   const buttonStyle = {
       //float:'right'
   }

   let onChangeHandler = (evt) => {
        console.log('NoteInput.onChangeHandler')
        console.dir(evt)
        console.log('pending')
        console.dir(pending)

        const field = evt.target
        if (field) {
            let update = {}
            update[field.name] = field.value

            dispatch(pendingUpdate(update))
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
    pending : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        pending: state.get('notes').get('pending')
    }
}

NoteInput = connect(mapStateToProps)(NoteInput);

export default NoteInput;
