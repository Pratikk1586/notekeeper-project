import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Head = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-200/30 backdrop-blur-md border-b border-white/30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl sm;text-3xl font-bold text-indigo-700 tracking-tight">
                    Sticky Notes
                </h1>
                {user && (
                    <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm fony-medium rounded-md transition duration-200 shadow-md">
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Head;