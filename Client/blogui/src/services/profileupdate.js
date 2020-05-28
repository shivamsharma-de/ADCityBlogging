import axios from "axios";
import AuthService from './auth.service';

const API_URL = "http://localhost:5000/api/test/profileupdate/";

class Profileupdate {
    update(email, city, aboutme, website){
        const user = AuthService.getCurrentUser();
        console.log(user.id)
        return axios.put(API_URL + user.id ,{
            email,
            city,
            aboutme,
            website

          });
          
    }

}

export default new Profileupdate();