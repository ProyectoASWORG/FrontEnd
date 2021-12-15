import axios from "axios";
import env from "react-dotenv";
import { User } from "../models/User";

class UserService{
    public getUser = async (id: string): Promise<User> => {
        return await axios.get(`${env.API_URL}/users/${id}/show.json`)
            .then(response => response.data.user)
            .catch(error => console.log(error));
    }

    public updateUser = async (user: User|null) => {
        return await axios.put(`${env.API_URL}/users/${user?.id}/edit.json`, user)
            .then(response => {
                localStorage.setItem("User", JSON.stringify(response.data.user));
                return response.data.user;
            })
            .catch(error => console.log(error));
    }
}
export default new UserService();