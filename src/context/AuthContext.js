import { createContext, useState, useEffect} from "react";
import AuthReducer from "./AuthReducer";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    //const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const token = JSON.parse(localStorage.getItem('jwt'));
    const [auth, setAuth] = useState(token);
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;