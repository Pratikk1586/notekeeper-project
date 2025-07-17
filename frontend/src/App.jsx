import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import NoteDetails from "./pages/NoteDetails";
import EditForm from "./pages/EditForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Head from "./components/Head";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Head />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add"
          element={user ? <AddForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/details/:id"
          element={user ? <NoteDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditForm /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
