import { User } from "../../models/User";
import auth_service from "../../services/auth_service";
import { LOGIN_USER, LOGOUT_USER, SET_USER } from "./actionTypes";
import { DispatchType } from "./userTypes";

export function loginUserAction(token: string){
    return async (dispatch: DispatchType) => {
        try{
            const user = await auth_service.loginWithGoogle(token) as User; 
            dispatch(loginUser(user));
        }catch(e){
            console.log(e);
            return e;
        }
    }
}

const loginUser = (user: User) => ({
    type: LOGIN_USER,
    payload: user
})

export function logoutUserAction(){
    return async (dispatch: DispatchType) => {
        try{
            await auth_service.logOut();
            dispatch(logoutUser());
        }catch(e){
            console.log(e);
            return e;
        }
    }
}

const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: null
})

export const setUserAction = (user: User) =>({
    type: SET_USER,
    payload: user
})
