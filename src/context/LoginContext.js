import React, { createContext, useReducer } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';
import {getUserFromCookie} from '../cookies/cookies';
export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const cookieUserData= getUserFromCookie();

    const [userData, loginDispatch] = useReducer(loginReducer,cookieUserData || userDataInitialState);
    return (
        <LoginContext.Provider value={{userData,loginDispatch} }>
            { props.children }
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;