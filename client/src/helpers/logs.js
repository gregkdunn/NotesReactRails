export const logState = (title, state) => {
		const theState = state;
        console.log(title);
        console.dir(theState.toJS());
}

const useDebugConsole = true;
export const debugConsole = (strings) => {
	if (useDebugConsole) {
		console.log(strings)
	}
}