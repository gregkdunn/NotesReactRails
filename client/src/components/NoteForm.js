import React, {PropTypes} from 'react';
import {Card, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {yellow100} from 'material-ui/styles/colors'


//Uncontrolled Form Conponent Example 
//- state changed on submit

let NoteForm = ({note, onEditCloseHandler, onUpdateHandler}) => {
    let titleInput, contentInput

    const cancelClick = () => {
        console.log('NoteInput.cancelClick');
        onEditCloseHandler(note)
    }

    const updateClick = () => {
        console.log('NoteInput.updateClick');
        console.log(titleInput);
        const updateParams = {
            title: titleInput.getValue(),
            content: contentInput.getValue()
        }        

        onUpdateHandler(note, updateParams)
    }

    return (
            <Card className={(note.get('isSaving') ? 'dim ' : '') + 'ma2 fl w-30-ns w-90 bg-light-yellow'}>
             <span className="idDisplay fr pa2 f6 gray">{note.get('id')}</span>
             <TextField floatingLabelText="Title" ref={node => {titleInput = node}} className="db ma2" defaultValue={note.get('title')}/>
             <TextField floatingLabelText="Note" ref={node => {contentInput = node}} className="db ma2" defaultValue={note.get('content')}/>
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
        isSaving: React.PropTypes.boolean
    }).isRequired,
    onUpdateHandler:PropTypes.func.isRequired,
    onEditCloseHandler:PropTypes.func.isRequired
}

export default NoteForm
