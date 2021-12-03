import axios from "axios";
import env from "react-dotenv";
import { User } from "../models/User";

class AuthService {
    public loginWithGoogle = async (token:string) => {
        await axios.post(`${env.API_URL}/auth/sign_in`, null,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => {
                let user = res.data.user as User;
                localStorage.setItem("User", JSON.stringify(user));
            }).catch(err =>{
                console.log(err)
            })

    }

    public logOut = () => {
        localStorage.removeItem("User");
    }

    public getUser = (): User | null  =>{
        let user = localStorage.getItem("User");
        if(user){
            return JSON.parse(user) as User;
        }
        return null;
    }
}

export default new AuthService();

