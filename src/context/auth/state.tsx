import { User } from "../../models/User";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export enum Status {
    LOADING,
}

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}
