import React, {PropTypes} from 'react';
import {Card, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {yellow100} from 'material-ui/styles/colors'


//Uncontrolled Form Conponent Example 
//- state changed on submit

let NoteForm = ({note, onEditCloseHandler, onUpdateHandler}) => {
    const listItemStyle={margin:'8px',float:'left'};
    const cardStyle = {width:'320px', backgroundColor: yellow100};  
    const textFieldStyle = {display:'block', margin: '8px'};
    const idStyle ={float:'right',margin:'8px', fontSize:'10px'}

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
        <li style={listItemStyle} className={(note.get('isSaving') ? 'dim' : '')}>
       		<Card style={cardStyle}>
             <span style={idStyle}>{note.get('id')}</span>
             <TextField floatingLabelText="Title" ref={node => {titleInput = node}} style={textFieldStyle} defaultValue={note.get('title')}/>
             <TextField floatingLabelText="Note" ref={node => {contentInput = node}}  style={textFieldStyle} defaultValue={note.get('content')}/>
             <CardActions>
               <FlatButton label="Save" primary={true} onClick={e => {updateClick()}}/>
               <FlatButton label="Cancel" secondary={true} onClick={e => {cancelClick()}} />
             </CardActions>
       		</Card>
        </li>
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
