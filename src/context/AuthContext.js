import { createContext, useState, useEffect} from "react";
import AuthReducer from "./AuthReducer";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    //const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;