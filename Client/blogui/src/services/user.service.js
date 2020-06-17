import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    const loggeduser = JSON.parse(localStorage.getItem('user'));
    console.log(loggeduser.id)
    return axios.get(API_URL + `admin/${loggeduser.id}`);
  }
}

export default new UserService();