import { combineReducers } from "redux";
import commentReducer from "./comments/commentReducer";
import contributionReducer from "./contributions/contributionReducer";
import userReducer from "./user/userReducer";

export const masterReducer = combineReducers({
    contribution:contributionReducer, 
    comment:commentReducer,
    auth:userReducer
});