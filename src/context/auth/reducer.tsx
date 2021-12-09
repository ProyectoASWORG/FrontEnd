import { getSuggestedQuery } from "@testing-library/react";
import { User } from "../../models/User";
import auth_service from "../../services/auth_service";
import { ActionType, AuthActions, LoggedIn, LogInWithGoogle, LogOut } from "./actions";
import { AuthState } from "./state";

export function authReducer(state: AuthState, action: any): AuthState {
    switch (action.type){
        case ActionType.LogInWithGoogle:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case ActionType.LogOut:
            auth_service.logOut();
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        case ActionType.LoggedIn:
            let user = getUser();
            return {
                ...state,
                user: user,
                isAuthenticated: user ? true : false 
            }
        default:
            return state;
    }
}

export const loginUserWithGoogle = (user: User|null): LogInWithGoogle =>({
    type: ActionType.LogInWithGoogle,
    payload: user 
}) 

export const logOut = (): LogOut =>({
    type: ActionType.LogOut,
})

export const loggedIn = (): LoggedIn => ({
    type: ActionType.LoggedIn
})

const getUser = () => {
    return auth_service.getUser();
}