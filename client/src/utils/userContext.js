import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userState, setUserState] = useState({
        _id: '',
        userName: '',
        pseudonym: '',
        bio: '',
        avatar: '',
        myAlbums: [],
        followedAlbums: [],
        friends: []
    })

    return(
        <UserContext.Provider
        value={[userState, setUserState]}
        >
            {children}
        </UserContext.Provider>
    );
};