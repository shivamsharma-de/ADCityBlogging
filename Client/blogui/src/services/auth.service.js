/** @format */

import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
	login(username, password) {
		return axios
			.post(
				API_URL + "signin",
				{
					username,
					password,
				},
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log("response: ", JSON.stringify(response));
				if (response.data.id) {
					localStorage.setItem("user", JSON.stringify(response.data));
        }
        //else localStorage.removeItem("user") 

			//	return response.data;
			});
	}

	logout() {
    return axios.delete(API_URL + "signout", {withCredentials: true} ).then(response => {
      console.log("cookie deleted", response);
	  localStorage.removeItem("user");
	  window.location.reload();
    });    
	}

	register(firstname, lastname, gender, username, email, password, cgt) {
		return axios.post(API_URL + "signup", {
			firstname,
			lastname,
			gender,
			username,
			email,
			password,
			cgt,
		});
	}

	getCurrentUser() {
	  return JSON.parse(localStorage.getItem('user'));;
	}
}

export default new AuthService();
