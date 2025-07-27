import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [shopName, setShopName] = useState(null);

    useEffect(() => {
        // Check localStorage for existing user data on mount
        const storedUser = localStorage.getItem('user');
        const storedIsOwner = localStorage.getItem('isOwner');
        const storedShopName = localStorage.getItem('shopName');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedIsOwner === 'true') {
            setIsOwner(true);
        }
        if (storedShopName) {
            setShopName(storedShopName);
        }
    }, []);

    const login = (userData, ownerStatus, shopData) => {
        setUser(userData);
        setIsOwner(ownerStatus);
        setShopName(shopData ? shopData.name : null);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isOwner', ownerStatus);
        if (shopData) {
            localStorage.setItem('shopName', shopData.name);
        } else {
            localStorage.removeItem('shopName');
        }
    };

    const logout = () => {
        setUser(null);
        setIsOwner(false);
        setShopName(null);
        localStorage.clear(); // Clear all relevant data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isOwner, shopName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);