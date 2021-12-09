import { combineReducers } from "redux";
import contributionReducer from "./contributions/contributionReducer";
import userReducer from "./user/userReducer";

export const masterReducer = combineReducers({
    contribution:contributionReducer, 
    auth:userReducer
});