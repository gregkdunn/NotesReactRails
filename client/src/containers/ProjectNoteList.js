import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { fetchNotesIfNeeded } from '../actions/notesActions'
import NoteList from '../components/NoteList'
import { getSortedNotes } from '../selectors/sortSelectors'
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';
  
const iconStyles = {
  marginRight: 24,
}

class AppNoteList extends Component {

  static propTypes = {
    notes: PropTypes.instanceOf(Immutable.Map).isRequired,
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
        <p>
           <a href="#" onClick={this.props.fetchNotesIfNeeded}> <FontIcon className="material-icons" style={iconStyles} hoverColor={red500}>refresh</FontIcon></a>         
        </p>
        <NoteList notes={this.props.items} />  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    	notes: state.get('notes'),
      items: getSortedNotes(state.get('notes'))
    }
};

const ProjectNoteList = connect(
    mapStateToProps,
    {fetchNotesIfNeeded}
)(AppNoteList);

export default ProjectNoteList;