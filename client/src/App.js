import React from 'react';
import ProjectNoteList from './containers/ProjectNoteList';
import AppBar from 'material-ui/AppBar';

const App = () => (
            <div>
              <AppBar title="Notes"/>
              <div className="NoteArea">
	            <ProjectNoteList/>
              </div>
            </div>
);

export default App;
