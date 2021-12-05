import axios from "axios";
import env from "react-dotenv";
import { User } from "../models/User";

class AuthService {
    public loginWithGoogle = async (token:string): Promise<User> => {
        console.log(token)
        const user = await axios.post(`${env.API_URL}/auth/sign_in`, null,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => {
                let user = res.data.user as User;
                user.voted_contribution_ids = res.data.voted_contribution_ids;
                localStorage.setItem("User",JSON.stringify(user));
                return user;
            }).catch(err =>{
                console.log(err)
                return err;
            })
        return user;

    }

    public logOut = () => {
        localStorage.removeItem("User");
    }

    public getUser = (): User | null  =>{
        let user = localStorage.getItem("User")|| "{}";
        if(user && user !== "undefined"){
            return JSON.parse(user) as User;
        }
        return null;
    }
}

export default new AuthService();

