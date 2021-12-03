import { createContext, Dispatch } from "react";
import { AuthActions } from "./actions";
import { AuthState, initialState } from "./state";

export const AuthContext = createContext<{state: AuthState, dispatch: Dispatch<AuthActions>}>({
    state: initialState,
    dispatch: () => undefined
});