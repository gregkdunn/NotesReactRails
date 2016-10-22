export const logState = (title, state) => {
		const theState = state;
        console.log(title);
        console.dir(theState.toJS());
}

const useDebugConsole = false;
export const debugConsole = (strings) => {
	if (useDebugConsole) {
		console.log(strings)
	}
}