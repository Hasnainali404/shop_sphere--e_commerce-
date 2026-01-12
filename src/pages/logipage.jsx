import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import "./loginform.css";
import { UserContext } from "../context/userContaxt";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState(""); // NEW: State for auth errors

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset(); // Clear form when switching modes
    clearErrors();
    setIsSuccess(false);
    setAuthError(""); // Clear errors when switching
  };

  // --- NEW: Sign Up Logic ---
  const handleSignUp = async (data) => {
    setAuthError("");
    setIsLoading(true);

    // 1. Get existing users from localStorage or initialize an empty array
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 2. Check if user already exists
    const userExists = storedUsers.some((user) => user.email === data.email);

    if (userExists) {
      setAuthError("This email is already registered. Please sign in.");
      setIsLoading(false);
      return;
    }

    // 3. Add new user (only name, email, password for simplicity)
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password, // In a real app, this should be hashed!
    };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Simulate API call and completion
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Automatically switch to login mode after successful sign-up
    setTimeout(() => {
      setIsLogin(true);
      setIsSuccess(false);
      reset({ email: newUser.email }); // Pre-fill email for easy login
      setAuthError("Sign up successful! Please log in.");
    }, 1400);
  };
  // -------------------------

  // --- UPDATED: Login Logic ---
  const handleLoginSubmit = async (data) => {
    setAuthError("");
    setIsLoading(true);

    // 1. Get stored users
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 2. Find the user with matching email and password
    const user = storedUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      // Success: Perform context login and storage
      login(user);
      // NOTE: Using a separate 'user' key for the *currently logged-in* user is common
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Simulate API call and completion
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      setIsSuccess(true);

      // Redirect after success animation
      setTimeout(() => {
        navigate("/");
      }, 1400);
    } else {
      // Failure
      setIsLoading(false);
      setAuthError("Invalid email or password.");
    }
  };
  // -------------------------

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* --- Back Button (Top Left) --- */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back to Store</span>
      </Link>
      {/* -------------------------------------- */}

      {/* Background Decor (Assuming this is defined in loginform.css or Tailwind config) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-125 h-125 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="flex flex-row items-center justify-center mb-0.5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-indigo-600 rounded-xl mr-5 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-indigo-200"
            >
              F
            </motion.div>
            <h1 className="text-2xl flex items-center pb-4 justify-center font-bold text-slate-900">
              ShopSphere
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin
              ? "Enter your details to sign in"
              : "Join us for exclusive products"}
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 pt-4">
          <form
            onSubmit={handleSubmit(isLogin ? handleLoginSubmit : handleSignUp)}
            className="space-y-5"
          >
            <AnimatePresence mode="wait">
              {/* Name Field (Only for Signup) */}
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <InputGroup
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    error={errors.name}
                    register={register("name", {
                      required: "Name is required",
                    })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <InputGroup
              icon={Mail}
              type="email"
              placeholder="Email Address"
              error={errors.email}
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full bg-slate-50 border ${
                  errors.password || authError
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200"
                } rounded-xl py-3 pl-12 pr-12 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs font-medium ml-1 block"
              >
                {errors.password.message}
              </motion.span>
            )}

            {/* NEW: Auth Error Message */}
            {authError && (
              <motion.span
                key="auth-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-medium ml-1 block ${
                  authError.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {authError}
              </motion.span>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || isSuccess}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden
                  cursor-pointer
                 ${
                   isSuccess
                     ? "bg-green-500 shadow-green-200 cursor-not-allowed"
                     : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                 }
               `}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check size={20} />
                  <span>{isLogin ? "Signed In!" : "Registered!"}</span>
                </motion.div>
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Sign Up"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-indigo-600 font-bold hover:underline transition-all"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Input Component to keep code clean
const InputGroup = ({ icon: Icon, type, placeholder, error, register }) => (
  <div className="space-y-1">
    <div className="relative group">
      <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        <Icon size={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-slate-50 border ${
          error ? "border-red-400 bg-red-50" : "border-slate-200"
        } rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400`}
        {...register}
      />
    </div>
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs font-medium ml-1 block"
      >
        {error.message}
      </motion.span>
    )}
  </div>
);

export default LoginPage;
