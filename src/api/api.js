const API_BASE_ADDRESS = 'https://api.dribbble.com/v2';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;
const headers = new Headers({
  'Authorization': `Bearer ${API_TOKEN}`
});

export default class Api {
  static getShots () {
    const uri = `${API_BASE_ADDRESS}/user/shots`
    return fetch(uri, {
      method: 'GET',
      headers: headers
    })
      .then(res => {
        if (!res.ok)
          throw Error(res.statusText);
        return res.json()
      })
      .catch(err => err);
  };

  static getShot (id) {
    const uri = `${API_BASE_ADDRESS}/shots/${id}`
    return fetch(uri, {
      method: 'GET',
      headers: headers
    })
      .then(res => {
        if (!res.ok)
          throw Error(res.statusText);
        return res.json()
      })
      .catch(err => err);
  };

}