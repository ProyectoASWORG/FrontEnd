import { LOGIN_USER, LOGOUT_USER, SET_USER } from "./actionTypes";
import { UserAction, UserState } from "./userTypes";

const initialState: UserState = {
    isSignedIn: false,
    user: null
}

const userReducer = (
    state: UserState = initialState,
    action: UserAction 
): UserState => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isSignedIn: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isSignedIn: false
            }
        case SET_USER:
            return{
                ...state, 
                user: action.payload,
                isSignedIn: true
            }
        default:
            return state;
    }
}

export default userReducer;