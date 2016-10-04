import React from 'react';
import NoteInput from './containers/NoteInput';
import ProjectNoteList from './containers/ProjectNoteList';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const App = () => (
            <div>
                  <AppBar title="Appt"iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                  <Toolbar>
                	<ToolbarTitle text="Notes"/>
                	<ToolbarSeparator/>
                	<FlatButton label="+" primary={true} />	
                </Toolbar>
                <div className="NoteArea">
	                <NoteInput/>
	                <ProjectNoteList/>
                </div>
            </div>
);

export default App;
