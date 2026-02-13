/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface User {
    id?: string | number;
    email: string;
    name: string;
    role?: string;
    password?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (userdata: User) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Lazy initialize state directly from localStorage
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('currentUser');
    });

    const [loading] = useState<boolean>(false);

    // No longer need useEffect for initial load as it's handled above

    const login = async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const foundUser = users.find((u: User) => u.email === email && u.password === password);
        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            setUser(foundUser);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const signup = async (userData: User) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        if (users.find((u: User) => u.email === userData.email)) {
            return false; // User already exists
        }
        const newUser = { ...userData, id: Date.now() }; // Generate unique ID
        const newUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(newUsers));
        return true;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
