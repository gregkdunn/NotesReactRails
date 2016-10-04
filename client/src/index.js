import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configure-store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = configureStore();

const ApptApp = () => (
	<MuiThemeProvider>
		<App/>
	</MuiThemeProvider>
);

render(
    <Provider store={store}>
    	<ApptApp/>
    </Provider>,
    document.getElementById('root')
);
