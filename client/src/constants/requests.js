
export const defaultHeaders = new Headers({
  "Content-Type": "application/json",
  "X-Custom-Header": "Oracle SRM",
});

export const getInit = { method: 'GET',
               headers: defaultHeaders };

export const postInit = { method: 'POST',
               headers: defaultHeaders };               

export const putInit = { method: 'PUT',
               headers: defaultHeaders };

export const deleteInit = { method: 'DELETE',
               headers: defaultHeaders };

export const initWithBodyObject = (init, anObject) => {
	console.log('postObject');
	console.dir(anObject)
	const jsonObject = JSON.stringify(anObject);
	return Object.assign(init, {'body': jsonObject});

}

export const postInitWithBodyObject = (anObject) => {
	return initWithBodyObject(postInit, anObject)
}

export const putInitWithBodyObject = (anObject) => {
	return initWithBodyObject(putInit, anObject)
}





//base URLs
const baseURL = 'http://localhost:3001';
const versionNamespace = '/v1';
export const apiBaseURL = baseURL + versionNamespace;

//routes
const notesBase = '/notes';
export const notesURL = apiBaseURL + notesBase;
export const noteURL = (note) => {return notesURL + '/' + note.get('id')}


