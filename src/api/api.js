const API_BASE_ADDRESS = 'https://api.dribbble.com/v2';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;
const headers = new Headers({
  'Authorization': `Bearer ${API_TOKEN}`
});

export default class Api {
  static getShots () {
    const uri = `${API_BASE_ADDRESS}/user/shots`
    return fetch(uri, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          let messageError = res.status ? 'Status:' + res.status : '';
          messageError += res.statusText ? 'Status Text:' + res.statusText : '';
          throw new Error(messageError);
        }
        return res.json()
      })
  };

  static getShot (id) {
    const uri = `${API_BASE_ADDRESS}/shots/${id}`
    return fetch(uri, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          let messageError = res.status ? 'Status:' + res.status : '';
          messageError += res.statusText ? 'Status Text:' + res.statusText : '';
          throw new Error(messageError);
        }
        return res.json()
      })
  };

}