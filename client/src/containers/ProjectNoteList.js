import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { addNote, closeEditNote, deleteNote, fetchNotesIfNeeded, filterNotes, openEditNote,  pendingUpdate, removeNote, saveNote, sortNotes, updateNote } from '../actions/notesActions'
import {toggleLeft, toggleRight} from '../actions/panelActions'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList'
import Filter from '../components/Filter'
import Sort from '../components/Sort'
import Undo from './Undo'
import { getSortedItemsFilteredByKeyword } from '../selectors/sortSelector'
import FontIcon from 'material-ui/FontIcon'
import {red500, black} from 'material-ui/styles/colors'

class AppNoteList extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    pending: PropTypes.object.isRequired,
    fetchNotesIfNeeded : PropTypes.func.isRequired,
    leftPanelOpen : PropTypes.bool.isRequired,
    rightPanelOpen : PropTypes.bool.isRequired,
    toggleLeft: PropTypes.func.isRequired,
    toggleRight: PropTypes.func.isRequired
  }

  componentDidMount() {
  	console.log('COMPONENT_DID_MOUNT');
    const { fetchNotesIfNeeded } = this.props
    fetchNotesIfNeeded();
  }  

  leftColumnWidth() {
    const { leftPanelOpen } = this.props;
    let w = (leftPanelOpen) ? 'w-20' : 'w1 dn';
    return w;
  }

  midColumnWidth() {
    const { leftPanelOpen, rightPanelOpen } = this.props
    let w = 70;
    if(!leftPanelOpen) {w += 20}
    if(!rightPanelOpen) {w += 10}
    return w;
  }

  rightColumnWidth() {
    const { rightPanelOpen } = this.props;
    let w = (rightPanelOpen) ? 'w-10' : 'w1 dn';
    return w;
  }

  render() {
    return (
      <div className="w-100">
        <Toolbar>
          <ToolbarGroup firstChild={true}> 
            <FontIcon className="material-icons db cf" onClick={this.props.toggleLeft} color={this.props.leftPanelOpen ? red500 : black} hoverColor={red500} >create</FontIcon>
          </ToolbarGroup>
          <ToolbarGroup> 
            <FontIcon className="material-icons db center cf" hoverColor={red500} onClick={this.props.fetchNotesIfNeeded}>refresh</FontIcon>
          </ToolbarGroup>
          <ToolbarGroup> 
            <FontIcon className="material-icons db fr cf" onClick={this.props.toggleRight} color={this.props.rightPanelOpen ? red500 : black} hoverColor={red500} >sort</FontIcon>
          </ToolbarGroup>  
        </Toolbar>   
        
        <div className={'leftMenu fl pt4 ' + this.leftColumnWidth()} >
                  
          <NoteInput className="w-100 db" pending={this.props.pending} addNote={this.props.addNote} pendingUpdate={this.props.pendingUpdate} saveNote={this.props.saveNote}/> 

          <Undo className="ma0" canUndo={this.props.canUndo} canRedo={this.props.canRedo} onUndo={this.props.onUndo} onRedo={this.props.onRedo} />
        
        </div>
        <div className={'main fl pt3 w-' + this.midColumnWidth()}>

          <NoteList notes={this.props.items} onDeleteHandler={this.props.deleteNote} onEditCloseHandler={this.props.closeEditNote} onEditOpenHandler={this.props.openEditNote} onRemoveHandler={this.props.removeNote} onUpdateHandler={this.props.updateNote} /> 
         
        </div>
        <div className={'rightMenu fl pt4 ' +  this.rightColumnWidth()}>

          <Filter filterKeywords={this.props.filterKeywords} filterAction={this.props.filterNotes} />

          <div className="pt7"></div>

          <Sort sortValues={this.props.sortValues} selectedValue={this.props.sortBy} sortAction={this.props.sortNotes}/>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('THE STATE:')
  //console.dir(state)
  //console.log("state.getIn(['panels', 'isLeftPanelOpen']) " + state.getIn(['panels']))
    return {
    	items: getSortedItemsFilteredByKeyword(state.getIn(['notes', 'present'])),
      filterKeywords: state.getIn(['notes', 'present','filterKeywords']),
      sortBy: state.getIn(['notes', 'present', 'sortBy']),
      sortValues: state.getIn(['notes', 'present', 'sortValues']),
      pending: state.getIn(['notes', 'present','pending']),
      leftPanelOpen: state.getIn(['panels', 'isLeftOpen']),
      rightPanelOpen: state.getIn(['panels', 'isRightOpen'])
    }
};

const ProjectNoteList = connect(
    mapStateToProps,
   {
    addNote, 
    closeEditNote, 
    deleteNote, 
    fetchNotesIfNeeded, 
    filterNotes, 
    openEditNote, 
    pendingUpdate, 
    removeNote, 
    saveNote, 
    sortNotes, 
    updateNote,
    toggleLeft,
    toggleRight
  }
)(AppNoteList);

export default ProjectNoteList;