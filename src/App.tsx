import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import Dashboard from "./pages/Dashboard"
import { AuthProvider, useAuth } from "./context/AuthContext"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </AuthProvider>
    )
}

export default App
