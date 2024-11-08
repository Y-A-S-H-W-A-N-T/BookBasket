import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const ContextProvider = ({ children })=>{

    // Books state to store and display fetched books from api
    const [BookResults, setBookResults] = useState()

    return (
    <FavoriteContext.Provider value={{ BookResults,setBookResults }}>
        {children}
    </FavoriteContext.Provider>
    )
}
