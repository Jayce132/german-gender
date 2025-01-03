import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    return (
        <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
            {children}
        </UserContext.Provider>
    );
};