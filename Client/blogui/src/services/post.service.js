import axios from "axios";
import AuthService from './auth.service';

const API_URL = "http://localhost:5000/api/test/createpost/";

const API_URL2 = "http://localhost:5000/api/find/";
class PostService {
    createpost(title, content){
        const user = AuthService.getCurrentUser();
        console.log(user.id)
        return axios.post(API_URL  + user.id ,{
            title,
            content

          });
          
    }
    searchpost(query){
        const user = AuthService.getCurrentUser();
        console.log(user.id)
        return axios.get( API_URL2 + query);
          
    }


}

export default new PostService();