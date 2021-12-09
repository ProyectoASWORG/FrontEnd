import { User } from "../../models/User";

export type UserState = {
   user: User | null,
   isSignedIn: boolean, 
}

export type UserAction = {
    type: string;
    payload: User | null; 
}

export type DispatchType = (args: UserAction ) => UserAction 
