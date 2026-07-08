import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../services/authServer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


 
useEffect(() => {
    const checkUser = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data.user)

        } catch (err) {
            console.log(err)
            setUser(null)

        } finally {
            setLoading(false);
        }
    }
    checkUser();
}, [])

const login = async (userData) => {
    try {
        const data = await loginUser(userData);
        setUser(data.user);
    } catch (err) {
        console.log(err)
        setUser(null)
        setLoading(false);
        throw err;


    }

}

const register = async (userData) => {
    try {
        const data = await registerUser(userData);
        return data
    } catch (err) {
        console.log(err)
        throw err;
    }

}

const logout = async () => {
    try {
        await logoutUser();
    } catch (error) {
        console.log("Logout error:", error);
        throw error;
    } finally {
        setUser(null);
    }
};


return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth =() => useContext(AuthContext);