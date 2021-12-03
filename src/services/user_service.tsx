import axios from "axios";
import env from "react-dotenv";
import { User } from "../models/User";

class UserService{
    public getUser = async (id: string): Promise<User> => {
        return await axios.get(`${env.API_URL}/users/${id}/show.json`)
            .then(response => response.data.user)
            .catch(error => console.log(error));
    }
}
export default new UserService();