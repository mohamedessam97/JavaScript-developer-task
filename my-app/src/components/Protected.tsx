import { useLocation, Navigate, Outlet } from "react-router-dom";

const Protected = () => {
    const user =localStorage.getItem('user')
    const location = useLocation();
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default Protected;
