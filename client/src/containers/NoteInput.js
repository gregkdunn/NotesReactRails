import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions/notesActions';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const levels = [
  <MenuItem key={1} value={1} primaryText="Confidential" />,
  <MenuItem key={2} value={2} primaryText="High" />,
  <MenuItem key={3} value={3} primaryText="Normal" />,

];

let NoteInput = ({ dispatch }) => {

    const handleChange = (event, key, value) => {
        this.props.type = value;
    }
    const submitNote = () => {

        const titleElement = document.getElementById('title');
        const typeElement = document.getElementById('type');
        const messageElement = document.getElementById('message');

        
        if(!titleElement.value && !messageElement.value) {
            return 
        }

        const noteParams = {
            title: titleElement.value,
            message: messageElement.value
        };

        dispatch(addNote(1, noteParams));//TODO value for appointment id
        titleElement.value = '';
        messageElement.value = '';
    };

   const style = {
        display:'block'
   };

    return (
        <div>
            <form onSubmit={e => {e.preventDefault(); submitNote();}} id="noteForm">
                <TextField floatingLabelText="Title" id="title" style={style}/>
                <TextField floatingLabelText="Note" id="message" style={style}/>
                <RaisedButton label="Add Note" primary={true}  onClick={e => {submitNote();}}/>
            </form>
        </div>
    );
};
NoteInput = connect()(NoteInput);

NoteInput.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};
NoteInput.InitialState = {
    title: '',
    message: ''
};

export default NoteInput;
