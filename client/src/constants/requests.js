
export const defaultHeaders = new Headers({
  "Content-Type": "application/json",
  "X-Custom-Header": "Oracle SRM",
});

export const getHeaders = { method: 'GET',
               headers: defaultHeaders };

export const deleteHeaders = { method: 'DELETE',
               headers: defaultHeaders };

const postHeaders = { method: 'POST',
               headers: defaultHeaders };               

const putHeaders = { method: 'PUT',
               headers: defaultHeaders };

const initWithBodyObject = (init, anObject) => {
	console.log('postObject');
	console.dir(anObject)
	const jsonObject = JSON.stringify(anObject);
	return Object.assign(init, {'body': jsonObject});

}

export const postHeadersWithBodyObject = (anObject) => {
	return initWithBodyObject(postHeaders, anObject)
}

export const putHeadersWithBodyObject = (anObject) => {
	return initWithBodyObject(putHeaders, anObject)
}

//Base URLs
export const baseURL = 'http://localhost:3001';
export const versionNamespace = '/v1';
export const apiBaseURL = baseURL + versionNamespace;

//API routes
export const notesBaseURL = '/notes';
export const notesURL = apiBaseURL + notesBaseURL;
export const noteURL = (note) => {return notesURL + '/' + note.get('id')}


