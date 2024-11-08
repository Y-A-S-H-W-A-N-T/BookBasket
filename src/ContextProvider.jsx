import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const ContextProvider = ({ children })=>{

    const [BookResults, setBookResults] = useState()

    return (
    <FavoriteContext.Provider value={{ BookResults,setBookResults }}>
        {children}
    </FavoriteContext.Provider>
    )
}
