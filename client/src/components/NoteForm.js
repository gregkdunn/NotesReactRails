import React, {PropTypes} from 'react';
import {Card, CardActions} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {yellow100} from 'material-ui/styles/colors'


//Uncontrolled Form Conponent Example 
//- state changed on submit

let NoteForm = ({note, editClose, updateNote}) => {
    let titleInput, contentInput, importanceSlider

    const cancelClick = () => {
        console.log('NoteInput.cancelClick');
        editClose(note)
    }

    const updateClick = () => {
        console.log('NoteInput.updateClick');
        
        const updateParams = {
            title: titleInput.getValue(),
            content: contentInput.getValue(),
            importance: importanceSlider.getValue()
        }        
        console.dir(updateParams);
        updateNote(note, updateParams)
    }

    return (
            <Card style={{minHeight:'280px', backgroundColor:yellow100}} className={(note.get('isSaving') ? 'dim ' : '') + 'ma2 fl w-30-ns w-90 bg-light-yellow'}>
             <span className="idDisplay fr pa2 f6 gray">{note.get('id')}</span>
             <TextField floatingLabelText="Title" ref={node => {titleInput = node}} className="db ma2" defaultValue={note.get('title')}/>
             <TextField floatingLabelText="Note" ref={node => {contentInput = node}} className="db ma2" defaultValue={note.get('content')}/>
             <Slider className="center w-60" ref={node => {importanceSlider = node}} step={1} value={note.get('importance')} min={1} max={3}  name="importance" />           
             <CardActions>
               <FlatButton label="Save" primary={true} onClick={e => {updateClick()}}/>
               <FlatButton label="Cancel" secondary={true} onClick={e => {cancelClick()}} />
             </CardActions>
       		</Card>
    )
}

NoteForm.propTypes = {
    note: PropTypes.shape({
        id: React.PropTypes.number,
        title: React.PropTypes.string,
        content: React.PropTypes.string,
        importance: React.PropTypes.number,
        isSaving: React.PropTypes.boolean
    }).isRequired,
    updateNote:PropTypes.func.isRequired,
    editClose:PropTypes.func.isRequired
}

export default NoteForm
