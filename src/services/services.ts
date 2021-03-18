const apiUrl = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_API_KEY

export const fetchGetJson = async (path: string) => {
  if (apiUrl && token) {
    try {
      const response: any = await fetch(`${apiUrl}${path}`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': token
        })
      });
      const responseJson = await response.json()
      return responseJson;
    } catch (err) {
      return { message: 'Something went wrong, please try again' }
    }
  }
};

export const fetchDelete = async (path: string) => {
  if (apiUrl && token) {
    try {
      const response: any = await fetch(`${apiUrl}${path}`, {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': token
        })
      });
      return response;
    } catch (err) {
      return { message: 'Something went wrong, please try again' }
    }
  }
};

export const fetchPostJson = async (path: string, body: any) => {
  if (apiUrl && token) {
    try {
      const response: any = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: new Headers({
          'Authorization': token
        }),
        body: JSON.stringify(body)
      });
      const responseJson = await response.json()
      return responseJson;
    } catch (err) {
      return { message: 'Something went wrong, please try again' }
    }
  }
};

export const fetchPostFile = async (path: string, body: any) => {
  if (apiUrl && token) {
    try {
      const response: any = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: new Headers({
          'Authorization': token
        }),
        body: body
      });
      const responseJson = await response.json()
      return responseJson;
    } catch (err) {
      return { message: 'Something went wrong, please try again' }
    }
  }
};