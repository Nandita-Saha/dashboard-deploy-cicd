import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (userdata: any) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            setUser(foundUser);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const signup = async (userData: any) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find((u: any) => u.email === userData.email)) {
            return false; // User already exists
        }
        const newUsers = [...users, userData];
        localStorage.setItem('users', JSON.stringify(newUsers));
        return true;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
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
