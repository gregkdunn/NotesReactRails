export const checkStatus  =  (response) => {
  console.log('CHECKSTATUS:'); 
    if (response.status >= 200 && response.status < 300) {
      console.dir(response);
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  export const parseJSON = (response) => {
    console.log('PARSEJSON:');
    let json =  response.json();
    console.dir(json);
    return json;
  }

