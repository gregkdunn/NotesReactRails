import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { fetchNotesIfNeeded } from '../actions/notesActions'
import NoteInput from './NoteInput';
import NoteList from '../components/NoteList'
import NoteFilter from './NoteFilter'
import NoteSort from './NoteSort'
import { getSortedItemsFilteredByKeyword } from '../selectors/filterSelector'
import FontIcon from 'material-ui/FontIcon'
import {red500} from 'material-ui/styles/colors'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'

const iconStyles = {
  marginRight: 24,
}

class AppNoteList extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Immutable.List).isRequired,
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
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <FontIcon className="material-icons" style={iconStyles} hoverColor={red500} onClick={this.props.fetchNotesIfNeeded}>refresh</FontIcon>
          </ToolbarGroup>
          <ToolbarGroup> 
            
          </ToolbarGroup>
        </Toolbar>
        <div className="bb w-100">
          <div className="fr w-20 m2"><NoteSort /></div>  
          <div className="w-80"><NoteFilter /></div>
        </div>
        <NoteList notes={this.props.items} /> 
        <NoteInput/> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    	items: getSortedItemsFilteredByKeyword(state.get('notes')),
    }
};

const ProjectNoteList = connect(
    mapStateToProps,
    {fetchNotesIfNeeded}
)(AppNoteList);

export default ProjectNoteList;