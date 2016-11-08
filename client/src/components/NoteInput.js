import React, { PropTypes } from 'react'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
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
            importance: pending.importance,
            uuid: uuidVal
        };  

        addNote(noteParams)
        saveNote(noteParams)

        resetForm()
    }

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

   let onSliderChangeHandler = (evt, value) => {
        console.log('NoteInput.onSliderChangeHandler')
        console.dir(evt  + ' : ' + value)
        console.log('pending')
        console.dir(pending)
        let update = {'importance': value}
        pendingUpdate(update)
   }

    return (
        <Card  style={{}} className='ma2 fl w-30-ns w-90 bg-light-yellow'>
                <CardHeader
                  title="New Note"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
            <form onSubmit={e => {e.preventDefault(); submitNote();}} id="noteForm">
            <CardText>
                <TextField floatingLabelText="Title" value={pending.title} style={textFieldStyle} name="title" onChange={onChangeHandler} />
                <TextField floatingLabelText="Note" value={pending.content} style={textFieldStyle} name="content" onChange={onChangeHandler} />

                <p>Importance</p>
                <Slider className="w-60" step={1} value={pending.importance} min={1} max={3}  name="importance" onChange={onSliderChangeHandler} />
            </CardText>
            <CardActions>    
                <RaisedButton label="Add Note" primary={true}  style={buttonStyle} onClick={e => {submitNote();}}/>
                 <FlatButton label="Clear" secondary={true} onClick={e => {resetForm()}} />

            </CardActions>
            </form>
        </Card>
    );
};

NoteInput.PropTypes = {
    pending : PropTypes.shape({
        title: React.PropTypes.string,
        content: React.PropTypes.string,
        importance: React.PropTypes.number
    }).isRequired,
    pendingUpdate: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired
}

export default NoteInput;
