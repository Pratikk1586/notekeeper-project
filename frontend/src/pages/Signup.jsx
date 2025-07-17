import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!/\d/.test(password)) {
      return "Password must include at least one number.";
    }
    if (!/[\W_]/.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handleChange = (e) => {
    console.log(e,  "from signup");
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      const pwdError = validatePassword(e.target.value);
      setError(pwdError);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const pwdError = validatePassword(form.password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    try {
      await api.post("/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-10 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-sm">
          Create Account
        </h2>
        <p className="text-center text-sm text-white/80">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>


            <div className="relative w-full flex justify-between items-center rounded-xl  bg-white/90 text-gray-800 outline-none">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
                className="w-[100%] px-4 py-3 pr-10 rounded-xl bg-white/90 text-gray-800 outline-none"
              />

              <IconButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" text-gray-600 bg-white/90 absolute"
                aria-label={showPassword ? "Hide password" : "Show password"}
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          {error && (
            <div className="bg-red-100/70 border border-red-300 text-red-800 text-sm rounded-lg px-4 py-2 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!!error}
          >
            Register
          </button>
        </form>

        <p className="text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
