import React, { createContext, useReducer } from 'react';
import advertReducer from '../reducers/advertReducer';
export const AdvertContext = createContext();

const AdvertContextProvider = (props) => {

    const [allAdverts, advertDispatch] = useReducer(advertReducer, []);

    return (
        <AdvertContext.Provider value={{ allAdverts, advertDispatch }}>
            { props.children}
        </AdvertContext.Provider>
    );
};

export default AdvertContextProvider;