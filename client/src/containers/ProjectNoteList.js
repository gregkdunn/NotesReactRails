import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { addNote, closeEditNote, deleteNote, fetchNotesIfNeeded, filterNotes, openEditNote,  pendingUpdate, saveNote, sortNotes, updateNote } from '../actions/notesActions'
import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList'
import Filter from '../components/Filter'
import Sort from '../components/Sort'
import { getSortedItemsFilteredByKeyword } from '../selectors/sortSelector'
import FontIcon from 'material-ui/FontIcon'
import {red500} from 'material-ui/styles/colors'

const iconStyles = {
  margin: 24,
  float: 'left'
}

class AppNoteList extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    pending: PropTypes.object.isRequired,
    fetchNotesIfNeeded : PropTypes.func.isRequired
  }

  componentDidMount() {
  	console.log('COMPONENT_DID_MOUNT');
    const { fetchNotesIfNeeded } = this.props
    fetchNotesIfNeeded();
  }  

  render() {
    return (
      <div>
        <div className="bb w-100">
          <FontIcon className="material-icons" style={iconStyles} hoverColor={red500} onClick={this.props.fetchNotesIfNeeded}>refresh</FontIcon>
          <div className="fr w-20 m2"><Sort sortValues={this.props.sortValues} selectedValue={this.props.sortBy} sortAction={this.props.sortNotes}/></div>  
          <div className="w-80"><Filter filterKeywords={this.props.filterKeywords} filterAction={this.props.filterNotes} /></div>
        </div>
        <NoteList notes={this.props.items} onDeleteHandler={this.props.deleteNote} onEditCloseHandler={this.props.closeEditNote} onEditOpenHandler={this.props.openEditNote} onUpdateHandler={this.props.updateNote} /> 
        <NoteInput pending={this.props.pending} addNote={this.props.addNote} pendingUpdate={this.props.pendingUpdate} saveNote={this.props.saveNote}/> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    	items: getSortedItemsFilteredByKeyword(state.get('notes')),
      filterKeywords: state.getIn(['notes','filterKeywords']),
      sortBy: state.getIn(['notes', 'sortBy']),
      sortValues: state.getIn(['notes', 'sortValues']),
      pending: state.getIn(['notes','pending'])
    }
};

const ProjectNoteList = connect(
    mapStateToProps,
    {addNote, closeEditNote, deleteNote, fetchNotesIfNeeded, filterNotes, openEditNote, pendingUpdate, saveNote, sortNotes, updateNote}
)(AppNoteList);

export default ProjectNoteList;