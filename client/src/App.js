import React from 'react';
import NoteInput from './containers/NoteInput';
import ProjectNoteList from './containers/ProjectNoteList';
import AppBar from 'material-ui/AppBar';

const App = () => (
            <div>
                  <AppBar title="App" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                  <div className="NoteArea">
	                <NoteInput/>
	                <ProjectNoteList/>
                </div>
            </div>
);

export default App;
