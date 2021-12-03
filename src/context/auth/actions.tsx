import { User } from "../../models/User";

export enum ActionType{
    LogInWithGoogle,
    LoggedIn,
    LogOut,
    GetUser,
    Nothing 
}

export interface LogInWithGoogle {
    type: ActionType.LogInWithGoogle;
    payload:User|null;
}

export interface LogOut {
    type: ActionType.LogOut;
}

export interface LoggedIn {
    type: ActionType.LoggedIn;
}

export interface GetUser {
    type: ActionType.GetUser;
}

export interface Nothing {
    type: ActionType.Nothing;
}

export type AuthActions = LogInWithGoogle | LogOut | LoggedIn | GetUser |Nothing;