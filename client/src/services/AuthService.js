import axios from 'axios';
// to backend
const url = 'http://localhost:3000/';

export default {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then(response => response.data);
  },
  updateCountry(credentials) {
    return axios
      .put(url + 'country-update/:id', credentials)
      .then(response => response.data)
  },
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  }
};
